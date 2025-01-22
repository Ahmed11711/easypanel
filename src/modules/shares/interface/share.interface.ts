import { TypeStatusShare } from "../enum/share.enum";

export interface IShare {
    id: number;
    name: string;
    availableShare: number;
    period: number;
    price: number;
    profit: number;
    dividendDistributed: number;
    expireDate: Date;
    status: TypeStatusShare;
    created_at?:Date,
    updated_at?:Date,
    
  }
  