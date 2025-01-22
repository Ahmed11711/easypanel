import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Ads } from 'src/modules/ads/entity/ads.entity';
import { MarketingFees } from 'src/modules/affiliate/entity/affilite.entity';
import { RewardAffiliate } from 'src/modules/affiliate/entity/RewardAffiliate';
import { Blog } from 'src/modules/blogs/entity/blog.entity';
import { InvoiceEntity } from 'src/modules/cash-hand/entity/invoice.entity';
import { ContractEntity } from 'src/modules/contract/entity/contract.entity';
import { Country } from 'src/modules/country/entity/country.entity';
import { Deposite } from 'src/modules/deposite/entity/deposite.entity';
import { Device } from 'src/modules/device-access/entity/device.entity';
import { Devolper } from 'src/modules/devolper/entity/devolper.entity';
import { Notfication } from 'src/modules/notfication/entity/notifcation.entity';
import { Otp } from 'src/modules/otp/entity/otp.entity';
import { PinCodeEntity } from 'src/modules/pin-code/entity/pinCode.entity';
import { PriceShare } from 'src/modules/price-share/entity/price-share.entity';
import { Project } from 'src/modules/projects/entity/projects.entity';
import { ProfitShare } from 'src/modules/shares/entity/profitShare.entity';
import { Share } from 'src/modules/shares/entity/share.entity';
import { ShareUser } from 'src/modules/shares/entity/shareUser.entity';
import { UserWallte } from 'src/modules/user-wallte/entity/userWallte.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { UserKyc } from 'src/modules/userKyc/entity/userKyc.entity';
import { BuyWallet } from 'src/modules/wallte/entity/buyWallet.entity';
import { ProfitWallte } from 'src/modules/wallte/entity/profitWallte.entity';
import { Wallet } from 'src/modules/wallte/entity/wallet.entity';
import { Withdraw } from 'src/modules/withdraw/entity/withdraw.entinty';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'investment',
  entities: [
    User,
    UserKyc,
    Deposite,
    Otp,
    Device,
    UserWallte,
    Notfication,
    Ads,
    Country,
    Devolper,
    Wallet,
    Project,
    PinCodeEntity,
    Withdraw,
    InvoiceEntity,
    BuyWallet,
    ProfitWallte,
    ContractEntity,
    Share,
    ShareUser,
    Blog,
    MarketingFees,
    RewardAffiliate,
    ProfitShare,
    PriceShare
  ],
  synchronize: false,
};
