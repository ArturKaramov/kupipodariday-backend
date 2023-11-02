import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsNotEmpty, IsNumber, IsUrl, Length, Min } from 'class-validator';
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

  @Min(1)
  @IsNotEmpty()
  @Column({ type: 'float', scale: 2 })
  @IsNumber()
  price: number;

  @Column({ type: 'float', scale: 2, default: 0 })
  @IsNumber()
  raised: number;

  @Column({ default: 0 })
  copied: number;

  @Column()
  @Length(1, 1024)
  description: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @ManyToMany(() => User, (user) => user.offers)
  @JoinTable()
  offers: User[];
}
