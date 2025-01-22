import { typeStatusKyc } from '../enum/user-kyc.enum';

export interface IUserKyc {
  id: number;
  fullname: string;
  international_id: string;
  front_id_image: string;
  back_id_image?: string;
  face_image: string;
  active: typeStatusKyc;
  created_at: Date;
  updated_at: Date;
}
