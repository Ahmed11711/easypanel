import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { typeWallte } from '../enum/wallte.enum';

export class WallteTypeDto {
 @IsNotEmpty()
 @IsEnum(typeWallte)
  type: typeWallte;
}
