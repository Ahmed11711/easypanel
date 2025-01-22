import { IsNotEmpty, IsString } from 'class-validator';

export class CheckDeviceDto {
  @IsNotEmpty()
  @IsString()
  transactionId: string;
}
