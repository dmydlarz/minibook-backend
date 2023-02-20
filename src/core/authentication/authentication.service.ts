import { Injectable, UseInterceptors, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { LoggingInterceptor } from '../shared/interceptors/logging.interceptor';
import { UserRepository } from '../users/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../entities/user.entity';
import { isPasswordMatching } from '../../common/utils';
import { toUserRegistrationResponseDto } from '../../common/mapper';
import {
  AuthUserLoginResponse,
  AuthUserRegistrationRequest,
  AuthRecoveryRequest,
  AuthRecoveryResponse,
  AuthPayload,
  AuthUserRegistrationResponse
} from './dto';


@Injectable()
@UseInterceptors(LoggingInterceptor)
export class AuthenticationService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) { }

  // async login(authLoginRequest: AuthUserLoginRequest)
  async login(user: any): Promise<AuthUserLoginResponse> {
    console.log(`login -> ${JSON.stringify(user)}`);

    // TODO: Build avatar url
    const _authPayload: AuthPayload = {
      user: {
        userId: user.id,
        avatar: user.avatar ? user.avatar.url : '',
        displayName: user.displayname,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      }
    }

    const _token = await this.jwtService.signAsync(_authPayload)

    return {
      token: _token
    }
  }

  async register(authUserRegistrationRequest: AuthUserRegistrationRequest): Promise<AuthUserRegistrationResponse> {
  
    if (await this.userRepository.isExists(authUserRegistrationRequest.email)) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const _user = await this.userRepository.createUser(authUserRegistrationRequest);
    
    // send email
    // this.sendEmail(user.email, 'index', 'Welcome to MiniBook.io!', {
    //   username: user.displayname,
    //   code: 'cf1a3f828287',
    // });
    return toUserRegistrationResponseDto(_user);
  }

  recover(authRecoveryRequest: AuthRecoveryRequest): AuthRecoveryResponse {
    const { email } = authRecoveryRequest;
    const _user = this.userRepository.findOneByEmail(email)

    if (_user) {
      // send email
    }

    return {
      successful: true
    }
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const _user = await this.userRepository.findOneByEmail(email);
    if (_user && (await isPasswordMatching(_user.password, password))) {
      return _user
    }
    return null;
  }

}
