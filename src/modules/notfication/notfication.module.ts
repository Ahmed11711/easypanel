import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notfication } from './entity/notifcation.entity';
import { NotficationController } from './controller/notfication.controller';
import { NotficationService } from './service/notication.service';
import { PaginationService } from 'src/common/pagination/service/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notfication])],
  controllers: [NotficationController],
  providers: [NotficationService, PaginationService],
  exports: [NotficationService],
})
export class NotficatioModule {}
