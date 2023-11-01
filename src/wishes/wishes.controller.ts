import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/entities/user.entity';
import { ServerException } from 'src/exceptions/server.exceptions';
import { ErrorCode } from 'src/exceptions/error-codes';

@UseGuards(JwtGuard)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(
    @Req() req: Request & { user: User },
    @Body() createWishDto: CreateWishDto,
  ) {
    return this.wishesService.create(req.user, createWishDto);
  }

  @Get('last')
  getLast() {
    return this.wishesService.getLast();
  }

  @Get('top')
  getTop() {
    return this.wishesService.getTop();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wish = await this.wishesService.findOne(+id);
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    } else return wish;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req: Request & { user: User },
  ) {
    const wish = await this.findOne(id);
    if (wish.owner.id !== req.user.id) {
      throw new ServerException(ErrorCode.Forbidden);
    } else return this.wishesService.update(+id, updateWishDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request & { user: User }) {
    const wish = await this.findOne(id);
    if (wish.owner.id !== req.user.id) {
      throw new ServerException(ErrorCode.Forbidden);
    } else return this.wishesService.remove(+id);
  }

  @Post(':id/copy')
  async copy(@Param('id') id: string, @Req() req: Request & { user: User }) {
    const wish = await this.findOne(id);
    if (wish) {
      return this.wishesService.copy(+id, req.user);
    }
  }
}
