import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileService } from "src/Helper/img/service/file-upload.service";
import { InvoiceEntity } from "../entity/invoice.entity";
import { Repository } from 'typeorm';
import { IJWTpayload } from "src/modules/auth/interface/login.payload";
import { PaginationService } from 'src/common/pagination/service/pagination.service';

@Injectable()

export class InvoiceService{

    constructor(
      @InjectRepository(InvoiceEntity)
      private readonly inoviceService:Repository<InvoiceEntity>,
      private readonly fileServce:FileService,
      private readonly paginationService: PaginationService,

    ){}


    async upload(file: any,user:IJWTpayload): Promise<{ message: string }> {
        try {
           const upload = await this.fileServce.uploadFile(file, 'invoice');
          
          const storeInvoice=await this.storeInvoicedb(upload,user.userId);
           return {
            message: "Upload invoice success",
          };
        } catch (error) {
           throw new BadGatewayException(`Failed to upload invoice: ${error.message}`);
        }
      }

      async storeInvoicedb(file,userId):Promise<Boolean>{
         const newInovice=this.inoviceService.create({
          img:file,
          status:false,
          amount:0,
          user_id:userId
         })

       const storeNewInvoice=  await this.inoviceService.save(newInovice)

       return !! storeNewInvoice;
      }

      async allTransactions(query : any, user: IJWTpayload) {
  
        const conditions = { user_id: user.userId };
       const paginationData = await this.paginationService.paginate(
         this.inoviceService,
         query,
         conditions,
         ['id', 'amount','status','created_at'] 
       );
       return paginationData
       }
 
}