import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SendMethod } from '../enum/typeSend.enum';
import { TypeOtp } from '../enum/typeOtp.snum';

export class RestOtpDto {
  @ApiProperty({
    description: 'The email address associated with the OTP',
    example: 'user@example.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The method used to send OTP',
    example: 'email or sms or whatsapp',
  })
  @IsNotEmpty()
  @IsEnum(SendMethod)
  type: SendMethod;

  @IsEnum(TypeOtp)
  typeOtp: TypeOtp;
}
