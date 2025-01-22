import { Controller, Get, Post, Query } from '@nestjs/common';
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { TransactionHistoryServeice } from '../service/transaction-history.service';

@Controller('transaction')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryServeice:TransactionHistoryServeice
  ) {}

  @Post()
  async getAllTransactions(@Query() query: any, @GetCurrentUser() user: IJWTpayload) {

    return this.transactionHistoryServeice.allTransaction(query,user)
   }

  
}
