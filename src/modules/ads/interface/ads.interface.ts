import { AdType } from '../enum/ads.eum';

export class IAds {
  id: number;
  title: string;
  description: string;
  img: string;
  status: boolean;
  type: AdType;
}
