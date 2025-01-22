import { IProject } from 'src/modules/projects/interface/project.interface';

export interface IWallet {
  id: number;
  name: string;
  price: number;
  number_of_unit: number;
  price_unit: number;
  sold: number;
  percentage: number;
  peryears: number;
  limit: number;
  active: boolean;
  type: number;
  country_id: number;
  expire_date: string | null;
  statusApp: string;
  asiangmanet: number;
  deleted_at: string | null;
  project?: IProject;
}
