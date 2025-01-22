import { Module } from '@nestjs/common';
import { UserWallteController } from './controller/userWallte.controller';
import { UserWallteService } from './service/userWallte.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWallte } from './entity/userWallte.entity';
import { DepositeModule } from '../deposite/deposite.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserWallte]), DepositeModule, UserModule],
  controllers: [UserWallteController],
  providers: [UserWallteService],
  exports: [UserWallteService],
})
export class UserWaalteModule {}
