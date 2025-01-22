import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  Password: string;
}
