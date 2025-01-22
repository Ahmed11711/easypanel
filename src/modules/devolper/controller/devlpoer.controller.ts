import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DevolperService } from '../service/devolper.service';

@Controller('devolper')
export class DevolperCountroller {
  constructor(private readonly devolService: DevolperService) {}

  @Post()
  async getAll() {
    return await this.devolService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.devolService.getOne(id);
  }
}
