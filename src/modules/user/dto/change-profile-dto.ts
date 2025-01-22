import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class ChangeProfileDto {
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  phone: string;

  img?: string; 
}
