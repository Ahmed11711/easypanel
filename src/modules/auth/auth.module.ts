import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserService } from 'src/modules/user/service/user.service';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { FileService } from 'src/Helper/img/service/file-upload.service';
import { DeviceModule } from '../device-access/deviceAccess.module';
import { NotficatioModule } from '../notfication/notfication.module';
import { NotficationService } from '../notfication/service/notication.service';
import { DeviceService } from '../device-access/service/device.service';
import { SendGridService } from 'src/common/Provider/otp/sendGrid/sendgrid.service';
import { HashService } from 'src/common/HashingData/hash.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    DeviceModule,
    NotficatioModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret:
          configService.get<string>('JWT_SECRET') ??
          't-RxO_sGm3BjFJfM1SItnxpp9rBHac4',
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    FileService,
    SendGridService,
    HashService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
