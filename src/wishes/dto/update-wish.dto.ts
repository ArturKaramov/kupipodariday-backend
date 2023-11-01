import { Length, Min, IsUrl, IsOptional } from 'class-validator';

export class UpdateWishDto {
  @IsOptional()
  @Length(1, 250)
  name: string;

  @IsOptional()
  @IsUrl()
  link: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  @Min(1)
  price: number;

  @IsOptional()
  description: string;

  @IsOptional()
  raised: number;
}
