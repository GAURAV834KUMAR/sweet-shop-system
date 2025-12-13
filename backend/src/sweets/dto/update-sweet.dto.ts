import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class UpdateSweetDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  description?: string;
}
