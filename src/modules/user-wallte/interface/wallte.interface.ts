export interface IUserWallet {
  id: number;
  privateKey: string;
  publicKey: string;
  address: string;
  phrase: string;
  password: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
