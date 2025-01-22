import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devolper } from './entity/devolper.entity';
import { DevolperCountroller } from './controller/devlpoer.controller';
import { DevolperService } from './service/devolper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Devolper])],
  controllers: [DevolperCountroller],
  providers: [DevolperService],
  exports: [DevolperService],
})
export class DevolperModule {}
