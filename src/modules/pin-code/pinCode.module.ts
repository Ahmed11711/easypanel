import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinCodeController } from './controller/pinCode.controller';
import { PinCodeService } from './service/pinCode.service';
import { PinCodeEntity } from './entity/pinCode.entity';
import { HashService } from 'src/common/HashingData/hash.service';
import { DeviceModule } from '../device-access/deviceAccess.module';
import { UserWaalteModule } from '../user-wallte/userWallte.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PinCodeEntity]),
    DeviceModule,
    UserWaalteModule,
  ],
  controllers: [PinCodeController],
  providers: [PinCodeService, HashService],
  exports: [PinCodeService],
})
export class PinCodeModule {}
