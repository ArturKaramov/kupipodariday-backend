import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Req,
  UseGuards,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ServerException } from 'src/exceptions/server.exceptions';
import { ErrorCode } from 'src/exceptions/error-codes';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  GetMe(@Req() req: Request & { user: User }) {
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
    return this.usersService.getUserWishes(req.user.username);
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    } else {
      return user;
    }
  }

  @Get(':username/wishes')
  async getUserWishes(@Param('username') username: string) {
    const user = this.getUser(username);
    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    } else {
      return await this.usersService.getUserWishes(username);
    }
  }

  @Post('find')
  async find(@Body('query') query: string) {
    const users = await this.usersService.findMany(query);
    if (!users) {
      throw new ServerException(ErrorCode.UserNotFound);
    } else {
      return users;
    }
  }
}
