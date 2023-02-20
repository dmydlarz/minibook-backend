import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthPayload } from '../dto';

// token vaildation
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret')
    });
  }

  async validate(payload: AuthPayload): Promise<{ id: number, email: string, displayname: string }> {
    return { id: payload.user.userId, email: payload.user.email, displayname: payload.user.displayName }
  }
}
