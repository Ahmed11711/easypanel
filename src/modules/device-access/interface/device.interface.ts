import { DeviceStatus } from '../enum/deviceStatus.enum';
import { MangerStatus } from '../enum/mangerAccount.enum';

export class IDevice {
  id: number;
  ip_device: string;
  device_name: string;
  active: DeviceStatus;
  transaction_id: string;
  location: string;
  user_id: number;
  MangerStatus: MangerStatus;
}
