import { Module } from '@nestjs/common';
import { UserKycController } from './controller/userKyc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserKyc } from './entity/userKyc.entity';
import { UserKycService } from './service/userKyc.service';
import { FileService } from 'src/Helper/img/service/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserKyc])],
  controllers: [UserKycController],
  providers: [UserKycService,FileService],
  exports: [UserKycService],
})
export class UserKycModule {}
