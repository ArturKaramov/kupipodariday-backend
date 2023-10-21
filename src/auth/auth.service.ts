import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async validatePassword(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return null;
    }

    const matched = await this.hashService.compare(password, user.password);
    if (!matched) {
      return null;
    }

    delete user.password;

    return user;
  }
}
