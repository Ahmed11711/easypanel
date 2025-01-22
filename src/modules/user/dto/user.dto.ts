import {
  IsEmail,
  IsOptional,
  IsString,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Optional coming affiliate code',
    example: '3NJ2FDTW',
    required: false,
  })
  @IsOptional()
  @IsString()
  comming_afflite?: string;

  @ApiProperty({
    description: 'The password for the user',
    example: 'StrongPassword123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: 1234567890,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  phone: string;

  @ApiProperty({
    description: 'The ipDevice  of the Device user',
    example: '123ERT',
  })
  @IsString()
  @IsNotEmpty()
  ipDevice: string;

  @ApiProperty({
    description: 'The deviceName  of the Device name user',
    example: 'VIVO22Y',
  })
  @IsString()
  @IsNotEmpty()
  deviceName: string;

  @ApiProperty({
    description: 'The location  of the location name user',
    example: 'VIVO22Y',
  })
  @IsString()
  @IsNotEmpty()
  location: string;
}
