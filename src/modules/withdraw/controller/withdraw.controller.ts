import { Controller, Get, Query,Post, Body } from "@nestjs/common";
import { WithDrawService } from "../service/withdraw.service";
import { GetCurrentUser } from "src/modules/auth/decorator/get-current-user";
import { IJWTpayload } from "src/modules/auth/interface/login.payload";
import { OrderWithdraw } from "../dto/withdraw.dto";
import { WithdrawByBankDto } from "../dto/withdrawByBank.dto";

@Controller('withdraw')

export class WithDrawController{

    constructor(
        private readonly withdrawService:WithDrawService
    ){}

    @Get('get-transactions')
   async allTransaction(@Query() query: any,@GetCurrentUser() user:IJWTpayload){
    return await this.withdrawService.allTransactions(query,user);
    }

    @Post('order')
   async orderWithdraw(@Body() data:OrderWithdraw ,@GetCurrentUser() user:IJWTpayload){
        
        return await this.withdrawService.order(data,user)

    }
    @Post('orderByBank')
    async withdrawBank(@Body() data:WithdrawByBankDto ,@GetCurrentUser() user:IJWTpayload){
         
         return await this.withdrawService.orderByBank(data,user)
 
     }
}