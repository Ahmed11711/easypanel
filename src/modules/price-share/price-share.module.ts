import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceShare } from "./entity/price-share.entity";
import { PriceShareController } from "./controller/price-share.controller";
import { PriceShareService } from "./service/price-share.service";

@Module({
    imports:[TypeOrmModule.forFeature([PriceShare])],
    controllers:[PriceShareController],
    providers:[PriceShareService],
    exports:[PriceShareService],
})

export class PriceShareModule{}