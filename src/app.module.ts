import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserKycModule } from './modules/userKyc/userKyc.module';
import { ProjectModule } from './modules/projects/projects.module';
import { WalletModule } from './modules/wallte/wallte.module';
import { CountryModule } from './modules/country/country.module';
import { AdsModule } from './modules/ads/ads.module';
import { DevolperModule } from './modules/devolper/devolper.module';
import { DepositeModule } from './modules/deposite/deposite.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { databaseConfig } from './config/database.config';
import { DeviceModule } from './modules/device-access/deviceAccess.module';
import { UserWaalteModule } from './modules/user-wallte/userWallte.module';
import { NotficatioModule } from './modules/notfication/notfication.module';
import { PinCodeModule } from './modules/pin-code/pinCode.module';
import { TransactionHistoreyModule } from './modules/transaction-history/transaction.module';
import { WithdrawModule } from './modules/withdraw/withdraw.module';
import { InvoiceModule } from './modules/cash-hand/cashHand.module';
import { ContractModule } from './modules/contract/contract.module';
import { ShareModule } from './modules/shares/share.module';
import { BlogModule } from './modules/blogs/blog.module';
import { AffiliateModule } from './modules/affiliate/afflite.module';
import { PriceShareModule } from './modules/price-share/price-share.module';
 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UserModule,
    UserKycModule,
    WalletModule,
    ProjectModule,
    CountryModule,
    AdsModule,
    DevolperModule,
    DepositeModule,
    DeviceModule,
    UserWaalteModule,
    NotficatioModule,
     PinCodeModule ,
    TransactionHistoreyModule,
    WithdrawModule,
    InvoiceModule,
    ContractModule,
    ShareModule,
    BlogModule,
    AffiliateModule,
    PriceShareModule,

  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
   ],
})
export class AppModule {}
