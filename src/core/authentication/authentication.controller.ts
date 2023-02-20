import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserRequest } from 'src/common/decorator';
import { AuthenticationService } from './authentication.service';
import {
  AuthUserLoginRequest,
  AuthUserLoginResponse,
  AuthUserRegistrationRequest,
  AuthUserRegistrationResponse,
  AuthRecoveryRequest,
  AuthRecoveryResponse
} from './dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthenticationController {

  constructor(private readonly authService: AuthenticationService) { }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@UserRequest() userRequest: any): Promise<AuthUserLoginResponse> {
    return await this.authService.login(userRequest);
  }

  @Post('register')
  async register(@Body() authUserRegistrationRequest: AuthUserRegistrationRequest): Promise<AuthUserRegistrationResponse> {
    return await this.authService.register(authUserRegistrationRequest);
  }

  @Post('recover')
  async recover(@Body() authRecoveryRequest: AuthRecoveryRequest): Promise<AuthRecoveryResponse> {
    return await this.authService.recover(authRecoveryRequest);
  }
}
