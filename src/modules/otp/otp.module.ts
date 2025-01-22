import { forwardRef, Module } from '@nestjs/common';
import { OtpController } from './controller/otp.controller';
import { OtpService } from './service/otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entity/otp.entity';
import { UserModule } from '../user/user.module';
import { SendGridService } from 'src/common/Provider/otp/sendGrid/sendgrid.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Otp]),
    forwardRef(() => UserModule),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 10000, // 10 secound
        limit: 5,
      },
    ]),
  ],
  controllers: [OtpController],
  providers: [
    OtpService,
    SendGridService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [OtpService],
})
export class OtpModule {}
