import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalGuard } from './guards/local.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.auth(user);
  }

  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('signin')
  async signin(@Req() req: Request & { user: User }) {
    return this.authService.auth(req.user);
  }
}
