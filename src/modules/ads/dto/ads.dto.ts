import { IsEnum, IsOptional } from 'class-validator';
import { AdType } from '../enum/ads.eum';

export class AdsDto {
  @IsOptional()
  @IsEnum(AdType, { message: 'Type must be one of: stocks, sell, rent' })
  type: AdType;
}
