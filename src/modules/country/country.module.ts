import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entity/country.entity';
import { CountryCountroller } from './controller/country.controller';
import { CountryService } from './service/country.service';
import { FileService } from 'src/Helper/img/service/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryCountroller],
  providers: [CountryService,FileService],
  exports: [CountryService],
})
export class CountryModule {}
