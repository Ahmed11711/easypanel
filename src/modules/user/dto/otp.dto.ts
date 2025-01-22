import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsString,
  MinLength,
} from 'class-validator';

export class CheckOtpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'The OTP must be exactly 6 characters long.' })
  @MaxLength(6, { message: 'The OTP must be exactly 6 characters long.' })
  @IsString({ message: 'The OTP must be a string.' })
  @IsNotEmpty({ message: 'The OTP cannot be empty.' })
  otp: string;

  
}
