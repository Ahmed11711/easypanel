import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entity/wallet.entity';
import { WalletController } from './controller/wallte.controller';
import { WalletService } from './service/wallte.service';
import { PaginationService } from 'src/common/pagination/service/pagination.service';
import { BuyWallet } from './entity/buyWallet.entity';
import { ProfitWallte } from './entity/profitWallte.entity';
import { UserModule } from '../user/user.module';
import { PdfService } from 'src/common/generatePdf/create-pdf.service';
import { ShareService } from 'src/modules/shares/service/shares.service';
import { ShareModule } from '../shares/share.module';
import { ContractService } from '../contract/service/contract.service';
import { ContractModule } from '../contract/contract.module';
import { AffiliateModule } from '../affiliate/afflite.module';
// import { ContractService } from '../../contract/service/contract.service';



@Module({
  imports: [TypeOrmModule.forFeature([Wallet,BuyWallet,ProfitWallte]),UserModule,ShareModule,ContractModule,AffiliateModule],
  controllers: [WalletController],
  providers: [WalletService,PaginationService, PdfService],
  exports: [WalletService],
})
export class WalletModule {}
