import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Withdraw } from "./entity/withdraw.entinty";
import { WithDrawController } from "./controller/withdraw.controller";
import { WithDrawService } from "./service/withdraw.service";
import { PaginationService } from "src/common/pagination/service/pagination.service";
import { PinCodeModule } from "../pin-code/pinCode.module";
import { UserService } from "../user/service/user.service";
import { UserModule } from "../user/user.module";
import { NotficatioModule } from "../notfication/notfication.module";

@Module({
    imports:[TypeOrmModule.forFeature([Withdraw]),PinCodeModule,UserModule,NotficatioModule],
    controllers:[WithDrawController],
    providers:[WithDrawService,PaginationService],
    exports:[WithDrawService]

})

export class WithdrawModule{}