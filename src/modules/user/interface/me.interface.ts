import { IUserKyc } from 'src/modules/userKyc/interface/kyc.interface';
import { IUser } from './user.interface';
import { IPinCode } from 'src/modules/pin-code/interface/pinCode.interface';
import { MangerStatus } from 'src/modules/device-access/enum/mangerAccount.enum';

export interface IMe {
  id: number;
  name: string;
  email: string;
  password?: string;
  otp: string;
  comming_afflite: string;
  affiliate_code: string;
  email_verified_at: Date;
  phone: string;
  money: number;
  number_of_user: number;
  created_at: Date;
  userKyc?: IUserKyc;
  PinCode?: IPinCode;
  isManger?: MangerStatus;
  notificationsCount?: { count?: number }; // Optional property for notifications count
}
