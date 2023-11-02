import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto) {
    const { itemId, ...rest } = createOfferDto;
    const item = await this.wishesService.findOne(itemId);
    item.raised += +Number(createOfferDto.amount).toFixed(2);
    await this.wishesService.raise(itemId, { raised: item.raised });
    return await this.offersRepository.save({ ...rest, user, item });
  }

  async findAll() {
    return await this.offersRepository.find({
      relations: { user: true, item: true },
    });
  }

  async findOne(id: number) {
    return await this.offersRepository.findOne({
      where: { id },
      relations: { user: true, item: true },
    });
  }
}
