import { IUser } from "src/modules/user/interface/user.interface";

export interface IMarketingFees {
    id: number;  
    user_id: number;
    upline_id: number;
    amount: number;
    buffer_id: number;
    generations: number;
    num_unit: number;
    profit_users: number;

  }
  