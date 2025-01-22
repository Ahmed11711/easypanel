import { Module } from "@nestjs/common";
import { TransactionHistoryController } from "./controller/transaction-history.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Deposite } from "../deposite/entity/deposite.entity";
import { TransactionHistoryServeice } from "./service/transaction-history.service";
import { DepositeModule } from "../deposite/deposite.module";
import { WithdrawModule } from "../withdraw/withdraw.module";
import { PaginationService } from "src/common/pagination/service/pagination.service";
import { InvoiceModule } from "../cash-hand/cashHand.module";


@Module({
    imports:[DepositeModule,WithdrawModule,InvoiceModule],
    controllers:[TransactionHistoryController],
    providers:[TransactionHistoryServeice,PaginationService],
    exports:[TransactionHistoryServeice],
})

export class TransactionHistoreyModule{}