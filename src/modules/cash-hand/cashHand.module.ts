import { Module } from "@nestjs/common";
import { InvoiceController } from './controller/invoice.controller';
import {InvoiceService} from './service/invoice.service'
import { FileService } from "src/Helper/img/service/file-upload.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InvoiceEntity } from "./entity/invoice.entity";
import { PaginationService } from 'src/common/pagination/service/pagination.service';

@Module({
    imports: [TypeOrmModule.forFeature([InvoiceEntity])],
    controllers:[InvoiceController],
    providers:[InvoiceService,FileService,PaginationService],
    exports:[InvoiceService],
})

export class InvoiceModule{}