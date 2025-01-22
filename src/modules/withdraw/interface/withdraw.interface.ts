import { TypeWithdraw } from '../enum/withdraw.enum';

export interface IWithdraw {
  id: number;
  amount: number;
  Visa_number: string;
  transaction_id: string;
  status: TypeWithdraw;
   user_id: number;
  created_at: Date;
  updated_at: Date;
}
