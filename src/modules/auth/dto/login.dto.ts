import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class userLoginDto {
  @ApiProperty({
    example: 'AhmedSamir@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456789',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The ip_device  of the Device user',
    example: '123ERT',
  })
  @IsString()
  @IsNotEmpty()
  ip_device: string;

  @ApiProperty({
    description: 'The device_name  of the Device name user',
    example: 'VIVO22Y',
  })
  @IsString()
  @IsNotEmpty()
  device_name: string;

  @ApiProperty({
    description: 'The Location  of the Device Location user',
    example: 'cairo',
  })
  @IsString()
  @IsNotEmpty()
  location: string;
}
