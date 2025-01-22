import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceShare } from '../entity/price-share.entity';
import { Repository } from 'typeorm';
import { PriceShareInterface } from '../interface/price-share.interface';
import { LessThan } from 'typeorm';
 @Injectable()
export class PriceShareService {
  constructor(
    @InjectRepository(PriceShare)
    private readonly priceShareRepository: Repository<PriceShare>,
  ) {}

  getAll(): Promise<PriceShareInterface[] | []> {
     
     return this.priceShareRepository.find({
      where: { expire_date: LessThan(new Date()) },
    });
  }
}
