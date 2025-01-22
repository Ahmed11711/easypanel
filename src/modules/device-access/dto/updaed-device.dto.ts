import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DeviceStatus } from '../enum/deviceStatus.enum';

export class UpdateDeviceDto {
  @IsNotEmpty()
  @IsString()
  transactionId: string;

  @IsString()
  @IsEnum(DeviceStatus)
  active: DeviceStatus;
}
