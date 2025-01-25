import {  HttpException, Injectable ,HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Withdraw } from '../entity/withdraw.entity';
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
import { WithdrawByBankDto } from "../dto/withdrawByBank.dto";
import { TypeWithdrawEnum } from "../enum/typeWithdraw.enum";
import { UserWallteService } from 'src/modules/user-wallte/service/userWallte.service';
import { WithdrawByBankss } from "../entity/withdrawByBanks.entity";

@Injectable()


export class WithDrawService{

    constructor(
        @InjectRepository(Withdraw)
        private readonly withdrawRepositry: Repository<Withdraw>,
        @InjectRepository(WithdrawByBankss)
        private   readonly withdrawRepositryByBank: Repository<WithdrawByBankss>,
        private readonly paginationService: PaginationService,
        private readonly pinCodeService:PinCodeService,
        private readonly userService:UserService,
        private readonly notficationService:NotficationService,
        private readonly userWallteBlockchain :UserWallteService

        

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

     async order(data: OrderWithdraw, user: IJWTpayload): Promise<{ message: string }> {
      // Step 1: Verify Pin Code
      const pinCode = await this.pinCodeService.checkVerfied(data, user);
     var amountMony=0;
      // Step 2: Check if the withdrawal type is PROFIT or MONEY
      if (data.type === TypeWithdrawEnum.PROFIT) {
        // Check if the user has enough balance for the withdrawal
        const Muser=await this.userService.findOneByEmail(user.email);
        // console.log(Muser);
        if(Muser.number_points === 0)
        {
          const amount=data.amount/2;
          amountMony = amount;
           
          
          
        }else{
          const amount=data.amount;
          amountMony=amount;
          // console.log(amountMony);
          
        }
        
        const checkMoney = await this.userService.checkmyMoneyWithUpdate(user, amountMony);
        
        if (checkMoney) {
          // Proceed with transaction storage if the balance is sufficient
          await this.storeTransactionDB(amountMony, user.userId, data.publicAddress);
          return {
            message: "Success for profit withdrawal",
          };
        } else {
          // Handle insufficient funds for profit withdrawal
          throw new HttpException(
            'You don\'t have enough balance to withdraw profit. Please try again later.',
            HttpStatus.CONFLICT,
          );
        }
      } else {
        // Money withdrawal (when data.type is not 'PROFIT')
        const userWallteBlockchain = await this.userWallteBlockchain.myBlnceOfTron(user.userId);
    
        // Ensure proper comparison of numeric values (make sure `userWallteBlockchain` is a number)
        if (Number(data.amount) > Number(userWallteBlockchain)) {
          throw new HttpException(
            'You don\'t have enough balance for withdrawal. Please try again later.',
            HttpStatus.CONFLICT,
          );
        } else {
          // Proceed with transaction storage if the balance is sufficient
          await this.storeTransactionDB(data.amount, user.userId, data.publicAddress);
          return {
            message: "Success for money withdrawal",
          };
        }
      }
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

      async orderByBank(data:WithdrawByBankDto,user:IJWTpayload):Promise<{message:string}>{
      
  
       const pinCode= await this.pinCodeService.checkVerfied(data,user);
        
      var amountMony=0;

       if (data.type === TypeWithdrawEnum.PROFIT) {
        const Muser=await this.userService.findOneByEmail(user.email);
        // console.log(Muser);
        if(Muser.number_points === 0)
        {
          const amount=data.amount/2;
          amountMony = amount;
        }else{
          const amount=data.amount;
          amountMony=amount;
          // console.log(amountMony);
          
        }
        const checkMoney=await this.userService.checkmyMoneyWithUpdate(user,amountMony);

        if(checkMoney){
 
          data.amount=amountMony;
          await this.storeTransactionDByBank(data,user)
   
          return {
           message :"success for withdraw"
          }
         }else{
           throw new HttpException(
             'You dont have enough balance withdrawal. Please try again later.',
             HttpStatus.CONFLICT,
           );   
          
          }

       }else{
        const userWallteBlockchain = await this.userWallteBlockchain.myBlnceOfTron(user.userId);
      
        // Ensure proper comparison of numeric values (make sure `userWallteBlockchain` is a number)
        if (Number(data.amount) > Number(userWallteBlockchain)) {
          throw new HttpException(
            'You don\'t have enough balance for withdrawal. Please try again later.',
            HttpStatus.CONFLICT,
          );
        } else {
          // Proceed with transaction storage if the balance is sufficient
          await this.storeTransactionDByBank(data,user)
          return {
            message: "Success for money withdrawal",
          };
        }
       }




   
 
    
     
       
      }

      async storeTransactionDByBank(data:WithdrawByBankDto,user){
    
     
        // Create a new transaction with validated data
           const createTransaction = this.withdrawRepositryByBank.create({
            amount: data.amount,
            bankName: data.bankName,
            bankAccountName: data.bankAccountName,
            user_id: user.userId,
            ibanBank:data.ibanBank,
          });
         
    
 
          await this.withdrawRepositryByBank.save(createTransaction);
      }
      }

  
   