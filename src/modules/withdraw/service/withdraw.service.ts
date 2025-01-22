import {  HttpException, Injectable ,HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Withdraw } from '../entity/withdraw.entinty';
import { Repository } from 'typeorm';
import { IJWTpayload } from "src/modules/auth/interface/login.payload";
import { IWithdraw } from "../interface/withdraw.interface";
import { IDeposite } from "src/modules/deposite/interface/deposite.interface";
import { PaginationService } from 'src/common/pagination/service/pagination.service';
import { OrderWithdraw } from "../dto/withdraw.dto";
import { PinCodeService } from "src/modules/pin-code/service/pinCode.service";
import { UserService } from "src/modules/user/service/user.service";
import { TypeWallte } from "../enum/typeWallte.enum";
import { generateRandomAlphanumeric } from 'src/common/generateRandomCode/generateCode';
import { TypeWithdraw } from "../enum/withdraw.enum";
import { NotficationService } from "src/modules/notfication/service/notication.service";
import { NotficationType } from "src/modules/notfication/enum/notifaction.enum";
@Injectable()


export class WithDrawService{

    constructor(
        @InjectRepository(Withdraw)
        private readonly withdrawRepositry: Repository<Withdraw>,
        private readonly paginationService: PaginationService,
        private readonly pinCodeService:PinCodeService,
        private readonly userService:UserService,
        private readonly notficationService:NotficationService

    ){}

    async allTransactions(query: any, user: IJWTpayload) {
  
      const conditions = { user_id: user.userId };
     const paginationData = await this.paginationService.paginate(
       this.withdrawRepositry,
       query,
       conditions,
       ['id', 'amount','status','created_at'] 
     );
     return paginationData
     }

     async order(data:OrderWithdraw,user:IJWTpayload):Promise<{message:string}>{
      
       // check the pincode
      // check the have grter than money 
      // dicount it from mony 
      // store the transaction in db

      const pinCode= await this.pinCodeService.checkVerfied(data,user);
      const checkMoney=await this.userService.checkmyMoneyWithUpdate(user,  data.amount);
 

      if(checkMoney){

       await this.storeTransactionDB(data.amount,user.userId,data.publicAddress)

       return {
        message :"success for withdraw"
       }
      }else{
        throw new HttpException(
          'You dont have enough balance withdrawal. Please try again later.',
          HttpStatus.CONFLICT,
        );      }
    
      
     }
      async storeTransactionDB(amount:number,userId:number,Visa_number:string):Promise<void>{

        const createTransaction=this.withdrawRepositry.create({ 
          amount:amount,
          Visa_number:Visa_number,
          transaction_id:generateRandomAlphanumeric(14),
          status:TypeWithdraw.PENDING,
          user_id:userId
 
      })
       await this.withdrawRepositry.save(createTransaction);
      const text="Withdrawal request completed successfully"
       await this.notficationService.storeNewNotification(userId,text,NotficationType.WITHDRAW)


      
      }

  
    }