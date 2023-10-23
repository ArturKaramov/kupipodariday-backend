import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { IsUrl, Length } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  raised: number;

  @Column()
  copied: number;

  @Column()
  @Length(1, 1024)
  description: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @ManyToMany(() => User, (user) => user.offers)
  offers: User[];
}
