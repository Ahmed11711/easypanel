import {  Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContractEntity } from "./entity/contract.entity";
import { ContractController } from "./controller/contract.controller";
import { ContractService } from "./service/contract.service";

@Module({

    imports:[TypeOrmModule.forFeature([ContractEntity])],
    controllers:[ContractController],
    providers:[ContractService],
    exports:[ContractService],
})

export class ContractModule{}
