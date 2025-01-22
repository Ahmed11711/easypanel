export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  otp: string;
  comming_afflite: string;
  affiliate_code: string;
  email_verified_at: Date;
  img? :string;
  phone: string;
  money: number;
  status:string;
  number_of_user: number;
  number_points: number;
  created_at: Date;
}
