import { Module } from "@nestjs/common";
import { AffiliateController } from "./controller/affilite.controller";
import { AffiliateService } from "./service/Affiliate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MarketingFees } from "./entity/affilite.entity";
import { RewardAffiliate } from "./entity/RewardAffiliate";

@Module({
    imports:[TypeOrmModule.forFeature([MarketingFees,RewardAffiliate])],
    controllers:[AffiliateController],
    providers:[AffiliateService,],
    exports:[AffiliateService],
})
export class AffiliateModule{};