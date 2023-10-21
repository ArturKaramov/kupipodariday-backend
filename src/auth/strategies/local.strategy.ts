import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { SigninUserDto } from '../dto/signin-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(signinUserDto: SigninUserDto) {
    const { username, password } = signinUserDto;
    const user = await this.authService.validatePassword(username, password);

    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
