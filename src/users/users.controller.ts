import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { HashService } from 'src/hash/hash.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  @Get('me')
  GetMe(@Req() req: Request & { user: User }) {
    delete req.user.password;
    return req.user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('me')
  updateMe(
    @Req() req: Request & { user: User },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateMe(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  getMyWishes(@Req() req: Request & { user: User }) {
    return this.usersService.getMyWishes(req.user.id);
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get(':username/wishes')
  getUserWishes(@Param('username') username: string) {
    return this.usersService.getUserWishes(username);
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
