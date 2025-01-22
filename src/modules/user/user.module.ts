import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { OtpModule } from '../otp/otp.module';
import { DeviceModule } from '../device-access/deviceAccess.module';
import { NotficatioModule } from '../notfication/notfication.module';
import { HashService } from 'src/common/HashingData/hash.service';
import { FileService } from "src/Helper/img/service/file-upload.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    OtpModule,
    DeviceModule,
    NotficatioModule,
    
  ],
  controllers: [UserController],
  providers: [UserService,HashService,FileService],
  exports: [UserService],
})
export class UserModule {}
