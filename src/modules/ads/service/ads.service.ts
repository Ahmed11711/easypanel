import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ads } from '../entity/ads.entity';
import { IAds } from '../interface/ads.interface';
import { promises } from 'dns';
import { AdType } from '../enum/ads.eum';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ads)
    private readonly adsRepo: Repository<Ads>,
  ) {}

  async getAll(type?: AdType): Promise<IAds[] | []> {
    if (!type) {
      return this.adsRepo.find({ where: { status: true } });
    } else {
      return this.adsRepo.find({ where: { type, status: true } });
    }
  }
}
