import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AdsService } from '../service/ads.service';
import { AdsDto } from '../dto/ads.dto';

@Controller('ads')
export class AdsCountroller {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  async getAll(@Body() type: AdsDto) {
    return await this.adsService.getAll(type.type);
  }
}
