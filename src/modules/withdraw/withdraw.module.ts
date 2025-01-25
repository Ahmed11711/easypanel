import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Withdraw } from "./entity/withdraw.entity";
import { WithDrawController } from "./controller/withdraw.controller";
import { WithDrawService } from "./service/withdraw.service";
import { PaginationService } from "src/common/pagination/service/pagination.service";
import { PinCodeModule } from "../pin-code/pinCode.module";
import { UserService } from "../user/service/user.service";
import { UserModule } from "../user/user.module";
import { NotficatioModule } from "../notfication/notfication.module";
import { UserWaalteModule } from 'src/modules/user-wallte/userWallte.module';
import { WithdrawByBankss } from "./entity/withdrawByBanks.entity";


@Module({
    imports:[TypeOrmModule.forFeature([ WithdrawByBankss,Withdraw]),PinCodeModule,UserModule,NotficatioModule,UserWaalteModule],
    controllers:[WithDrawController],
    providers:[WithDrawService,PaginationService],
    exports:[WithDrawService]

})

export class WithdrawModule{}