import { Controller, Get, Post } from '@nestjs/common';
import { CountryService } from '../service/country.service';

@Controller('country')
export class CountryCountroller {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  getAll() {
    return this.countryService.getAll();
  }
}
