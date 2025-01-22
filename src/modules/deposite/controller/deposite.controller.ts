import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DepositeService } from '../service/deposite.service';
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';

@Controller('deposite')
export class DepositeController {
  constructor(private readonly depositeService: DepositeService) {}

  @Post()
  getDate() {
    return this.depositeService.checkInBinance();
  }

  @Get('get-transactions')
  async allTransaction(@Query() query:any,@GetCurrentUser() user:IJWTpayload){

   return await this.depositeService.allTransaction(query,user);
   }

 

  
}
