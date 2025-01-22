import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposite } from './entity/deposite.entity';
import { DepositeController } from './controller/deposite.controller';
import { DepositeService } from './service/deposite.service';
import { PaginationService } from 'src/common/pagination/service/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Deposite])],
  controllers: [DepositeController],
  providers: [DepositeService,PaginationService],
  exports: [DepositeService],
})
export class DepositeModule {}
