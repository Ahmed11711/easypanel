import { MangerStatus } from "src/modules/device-access/enum/mangerAccount.enum";

export class IJWTpayload {
  userId: number;
  email: string;
  MangerStatus?: MangerStatus;
  // status?:string;
}
