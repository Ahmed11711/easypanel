 
export interface IDeposite {
  id: number;
  amount: number;
  textId: string;
  network: string;
  status: boolean;
  from: string;
  to: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
