import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    private readonly usersService: UsersService,
  ) {}

  async create(id: number, createWishDto: CreateWishDto) {
    const user = await this.usersService.findOne(id);
    return await this.wishesRepository.save({
      ...createWishDto,
      owner: user,
    });
  }

  async getLast() {
    return await this.wishesRepository.find({
      order: { createdAt: 'desc' },
      take: 40,
    });
  }

  async getTop() {
    return await this.wishesRepository.find({
      order: { copied: 'asc' },
      take: 20,
    });
  }

  async findOne(id: number) {
    return await this.wishesRepository.findOneBy({ id });
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    await this.wishesRepository.update(id, updateWishDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.wishesRepository.remove(await this.findOne(id));
  }

  findAll() {
    return `This action returns all wishes`;
  }
}
