import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Country } from '../entity/country.entity';
import { Icountry } from '../interface/country.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly counRepo: Repository<Country>,
  ) {}

  async getAll(): Promise<Icountry[] | []> {
    const countrys = await this.counRepo.find({ where: { status: true } });
    return countrys;
  }
}
