import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { HashService } from 'src/hash/hash.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Get('me')
  GetMe(@Req() req: Request & { user: User }) {
    delete req.user.password;
    return req.user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.usersService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
