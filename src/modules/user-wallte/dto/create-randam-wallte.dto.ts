import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class passwordWallte {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  password: string;
}
