import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ads } from './entity/ads.entity';
import { AdsCountroller } from './controller/ads.controller';
import { AdsService } from './service/ads.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ads])],
  controllers: [AdsCountroller],
  providers: [AdsService],
  exports: [AdsService],
})
export class AdsModule {}
