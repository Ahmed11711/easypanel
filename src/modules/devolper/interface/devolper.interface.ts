import { IWallet } from 'src/modules/wallte/interface/wallte.interface';

export class IDevolper {
  id: number;
  name: string;
  desc: string;
  img: string;
  status: boolean;
  websiteUrl: string;
  Wallte?: IWallet;
}
