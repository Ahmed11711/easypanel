import { Body, Controller, Post, UploadedFile, UseInterceptors ,BadRequestException,Query, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../../../Helper/img/service/file-upload.service';
import {InvoiceService} from '../service/invoice.service'
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoceServuice:InvoiceService){}


  @Post('upload')
  @UseInterceptors(FileInterceptor('img')) 
  async uploadFile(@UploadedFile() file: Express.Multer.File,@GetCurrentUser() user:IJWTpayload) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
  
    const result = await this.invoceServuice.upload(file,user);
    return result;
   }

   @Post('all-transaction')
   async transactions(@Query() query: any,@GetCurrentUser() user:IJWTpayload){

    return this.invoceServuice.allTransactions(query,user)
   }
 
}
