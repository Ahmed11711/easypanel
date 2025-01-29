import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/common/pagination/service/pagination.service';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { InvoiceService } from 'src/modules/cash-hand/service/invoice.service';
import { Deposite } from 'src/modules/deposite/entity/deposite.entity';
import { TypeDeposite } from 'src/modules/deposite/enum/type-deposite.enum';
import { DepositeService } from 'src/modules/deposite/service/deposite.service';
import { WithDrawService } from 'src/modules/withdraw/service/withdraw.service';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionHistoryServeice {
  constructor(
    private readonly depositeService:DepositeService,
    private readonly invoiceService:InvoiceService,
    private readonly withdrawService:WithDrawService,
    private readonly paginationService: PaginationService,

   )
  {}
  async allTransaction(query: any, user: IJWTpayload) {
    // Fetch transactions from different sources
    const depositeTransactions = await this.depositeService.allTransaction(query, user);
    const depositeTransactionsByInvoice = await this.invoiceService.allTransactions(query, user);
    const withdrawTransactions = await this.withdrawService.allTransactions(query, user);
    const withdrawTransactionsByBank = await this.withdrawService.allTransactionsByBank(query, user);
   
    // Combine all transaction types into a single array with additional module and type fields
    const combinedTransactions = [
      ...depositeTransactions.data.map((item) => ({ ...item, module: 'deposite' })),
      ...depositeTransactionsByInvoice.data.map((item) => ({ ...item, module: 'deposite', type: TypeDeposite.CASHHAND })),
      ...withdrawTransactions.data.map((item) => ({ ...item, module: 'withdraw', type: 'blockchain' })), 
      ...withdrawTransactionsByBank.data.map((item) => ({ ...item, module: 'withdraw', type: 'bank' })),
    ];
  
    // Sort the combined transactions by creation date (latest first)
    const sortedTransactions = combinedTransactions.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();  // Sorting descending by created_at
    });
  
    // Pagination handling
    const { skip, take, page, limit } = this.paginationService.getPagination(query);
  
    // Slice data according to pagination
    const paginatedData = sortedTransactions.slice(skip, skip + take);
  
    return {
      data: paginatedData,
      total: sortedTransactions.length,
      page,
      limit,
      totalPages: Math.ceil(sortedTransactions.length / limit), // Calculate total pages
    };
  }
  
  }
