import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteDeviceDto {
  @IsNotEmpty()
  @IsString()
  transactionId: string;
}
