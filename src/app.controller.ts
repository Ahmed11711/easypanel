import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ISPublic } from './modules/auth/decorator/isPublic.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ISPublic()
  @Get()
  getHello(): string {
    return '555';
  }
}
