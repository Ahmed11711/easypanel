import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { TypeOtp } from '../enum/typeOtp.snum';

export class CheckOtpDto {
  @ApiProperty({
    description: 'The email address associated with the OTP',
    example: 'user@example.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description:
      'The OTP code received by the user. It should be at least 6 characters long.',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  otp: string;

  @IsEnum(TypeOtp)
  typeOtp: TypeOtp;
}
