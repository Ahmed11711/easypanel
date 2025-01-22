import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Share } from "./entity/share.entity";
import { ShareController } from "./controller/share.controller";
import { ShareService } from "./service/shares.service";
import { ShareUser } from "./entity/shareUser.entity";
import { ProfitShare } from "./entity/profitShare.entity";
import { UserModule } from "../user/user.module";
 
 
@Module({
    imports:[TypeOrmModule.forFeature([Share,ShareUser,ProfitShare]),UserModule ],
    controllers:[ShareController],
    providers:[ShareService,],
    exports:[ShareService],
})

export class ShareModule{}