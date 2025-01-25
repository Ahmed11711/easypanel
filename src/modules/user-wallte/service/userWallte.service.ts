// src/tron/tron.service.ts
import {
  ConflictException,
  Injectable,
  BadRequestException,
 
  NotFoundException,
} from '@nestjs/common';
import { TronWeb } from 'tronweb';
import axios from 'axios';
import { InjectRepository   } from '@nestjs/typeorm';
import { UserWallte } from '../entity/userWallte.entity';
import { Repository } from 'typeorm';
import { DepositeService } from 'src/modules/deposite/service/deposite.service';
import { UserService } from 'src/modules/user/service/user.service';
import { IUserWallet } from '../interface/wallte.interface';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import * as bip39 from 'bip39';
import * as hdkey from 'hdkey';
import { BigNumber } from 'bignumber.js';
import { AxiosResponse } from 'axios';

@Injectable()
export class UserWallteService {
  private tronWeb: TronWeb;

  constructor(
    @InjectRepository(UserWallte)
    private readonly userWalteRepo: Repository<UserWallte>,
    private readonly depositeRepo: DepositeService,
    private readonly userService: UserService,
    // private readonly httpService: HttpServer
  ) {
    this.tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
    });
  }

  async createWallet(
    userId: number,
    password: string,
  ): Promise<{ messgae: string }> {
    const checkHaveAcount = await this.checkHaveAcount(userId);

    if (checkHaveAcount) {
      throw new NotFoundException('you Aleray Have Wallte');
    }
    const newWallte = await this.tronWeb.createRandom();
    const createNewWallte = this.storeWallte(userId, newWallte);
    return {
      messgae: 'Suucess to create Wallte',
    };
  }

  async getPrivateKeyFromMnemonic(mnemonic, password){
    const seed = bip39.mnemonicToSeedSync(mnemonic, password);

    // Generate HD wallet from the seed
    const hdWallet = hdkey.fromMasterSeed(seed);

    // Get the first account's private key (TRON uses the same standard as Ethereum, so we can use it)
    const path = "m/44'/195'/0'/0/0"; // Standard path for TRON (BIP44)
    const key = hdWallet.derive(path);

    // Convert private key to a hexadecimal string
    return key.privateKey.toString('hex');
  }


  async getTransactionLogs(user_id: number) {
    const actualLimit = process.env.LIMIT_TRANSACTION || 10;
    const checkHaveAcount = await this.checkHaveAcount(user_id);

    if (!checkHaveAcount) {
      throw new NotFoundException('Pleas Create Wallte');
    }

    const address = checkHaveAcount.address;
    const url = `https://api.trongrid.io/v1/accounts/${address}/transactions/trc20/?limit=${actualLimit}`;

  
    try {
      const response = await axios.get(url);
      const allTransactions = response.data.data;
     

      if (!Array.isArray(allTransactions)) {
        throw new Error('Unexpected response format');
      }

      // Filter transactions where 'to' address matches the target address
      const filteredTransactions = allTransactions.filter(
        (transaction) =>
          transaction.to &&
          transaction.to.toLowerCase() === address.toLowerCase() &&
          transaction.token_info &&
          transaction.token_info.address ===
            'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // Check the token_info address
      );

      const newDeposite = await this.storeFilteredTransactions(
        filteredTransactions,
        address,
        user_id,
      );
      if (newDeposite && newDeposite == 0) {
        return {
          message: 'Total amount is 0 or less.',
        };
      } else {
        // await this.userService.addMoney(user_id, newDeposite);

        return {
          message: `You made a deposit of ${newDeposite}.`,
        };
      }
    } catch (error) {
      throw new NotFoundException('Failed to fetch transaction logs', error);
    }
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
  async checkHaveAcount(user_id: number): Promise<IUserWallet | null> {
    const wallt = await this.userWalteRepo.findOneBy({ user_id });

    return wallt;
  }

  async storeWallte(userId, data) {
    const wallte = data.mnemonic;
    const newWallte = this.userWalteRepo.create({
      user_id: userId,
      privateKey: data.privateKey,
      publicKey: data.publicKey,
      address: data.address,
      phrase: wallte.phrase,
      password: "11",
    });

    await this.userWalteRepo.save(newWallte);
  }

  async storeFilteredTransactions(
    allTransactions: any[],
    address: string,
    user_id: number,
  ): Promise<number> {
    try {
      const existingTransactions =
        await this.depositeRepo.findByAddress(address);
      const existingTransactionIds = new Set(
        existingTransactions.map((transaction) => transaction.textId),
      );

      let totalAmount = 0;

      // Step 2: Filter and store only unique transactions based on textId
      for (const transaction of allTransactions) {
        const transactionId = transaction.transaction_id;

        // Check if this transaction is unique (not in the database or previously stored transactions)
        if (!existingTransactionIds.has(transactionId)) {
          await this.depositeRepo.storeInDatabase(transaction, user_id); // Store the unique transaction
          existingTransactionIds.add(transactionId); // Track this textId to prevent future duplicates

          totalAmount += transaction.value / 1000000;
        }
      }

      // Return the total amount in the expected format (converted to main units)
      return totalAmount;
    } catch (error) {
      console.error('Error storing filtered transactions:', error);
      throw new Error('Failed to store filtered transactions');
    }
  }

  async myAddress(user: IJWTpayload):Promise<{myaddress:string}> {

    const wallt = await this.checkHaveAcount(user.userId);
    if(wallt){
      return {
        myaddress:wallt.address
      };
    } 

    throw new NotFoundException('Please Create Pin code');
   
   }

   async myWallteCredantiona(user_id: number): Promise<IUserWallet | null>{
    const wallt = await this.userWalteRepo.findOneBy({ user_id });
     return  wallt ;
   }

    

  async sendTRC20(to: string, amount: number, user_id: number,privateKey) {
     const myWallte=await this.checkHaveAcount(user_id);
    if(!myWallte){
      throw new NotFoundException('Please Create Wallte  ');

    }
    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
      privateKey:  privateKey
    });

      const jstContractAddress="TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
      // Create contract instance for USDT TRC20
     
      
      const contract = await  tronWeb.contract().at(jstContractAddress);
       // Convert the amount to the smallest unit (6 decimals for USDT)
      const amountInSmallestUnit = new BigNumber(amount).multipliedBy(1e6).toFixed(0);

      // Send the transaction
      const tx = await contract.transfer(to, amountInSmallestUnit).send({
        shouldPollResponse: false,
        privateKey:  privateKey
    });

    const transactionDetails = await tronWeb.trx.getTransaction(tx);
    

      console.log('Transaction successful:', tx);
      return transactionDetails;
   
  }
  async sendTRX(fromAddress: string, toAddress: string, amount: number, privateKey: string) {
    
    try {
      // Build the transaction
      const transaction = await this.tronWeb.transactionBuilder.sendTrx(
        toAddress, 
        amount, 
        fromAddress
      );

      // Sign the transaction
      const signedTransaction = await this.tronWeb.trx.sign(transaction, privateKey);

      // Send the signed transaction
      const receipt = await this.tronWeb.trx.sendRawTransaction(signedTransaction);
      return receipt;
    } catch (error) {
      console.error('Error sending TRX:', error);
      throw new Error('Transaction failed');
    }
  }

   
  async myBlnceOfTron(user_id) {
    
    const myWallte=await this.checkHaveAcount(user_id);
    if(!myWallte){
      throw new NotFoundException('Please Create Wallte  ');

    }
    const responses = await axios.get(`https://api.tronscan.org/api/account?address=${myWallte.address}`)

    // const usdtData = responses.data.tokenes.filter(item => item.tokenAbbr === "USDT");

    const usdtData = responses.data.tokens.filter(item => item.tokenAbbr === "USDT");

    if (usdtData.length > 0) {
      const usdt = usdtData[0]; // Get the first USDT token (assuming only one result)
    
      // Calculate the actual amount
      const actualAmount = parseInt(usdt.balance) / Math.pow(10, usdt.tokenDecimal);
    
      // Log the raw balance for debugging
     
      return actualAmount;
    } else {
       return 0;
    }

    // consle
    // // return usdtDate;
    // return responses.data.tokens;
  } 




  // import * as TronWeb from 'tronweb';

 
async   sendTransactionAndEstimateEnergy(
  senderPrivateKey: string,  
  contractAddress: string,    
  recipientAddress: string,  
  amountInUSDT: number,      
  usdToTrxRate: number = 10  
) {
     // تحويل المبلغ من USDT إلى Sun
    const trxAmount = amountInUSDT * usdToTrxRate;

    // تهيئة TronWeb
    const tronWeb = new TronWeb({
      fullHost: 'https://nile.trongrid.io', 
      privateKey: senderPrivateKey,
    });

     const jstContractAddress="TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
    
    
    const contract = await  tronWeb.contract().at(jstContractAddress);
        if (!contract) {
      throw new Error('Contract does not exist on the network');
    }
    console.log(contract);

    // تحديد اختيارات الوظيفة (transfer(address,uint256))
    const functionSelector = 'transfer(address,uint256)';
    const parameters = [
      { type: 'address', value: recipientAddress },
      { type: 'uint256', value: trxAmount }
    ];

    // تحديد العنوان الخاص بالمُرسل
    const issuerAddress = tronWeb.defaultAddress.base58;
          //  return issuerAddress ;
    // تقدير الطاقة المطلوبة
    const estimateResult = await tronWeb.transactionBuilder.estimateEnergy(
      contractAddress, 
      functionSelector, 
      {}, 
      parameters,  
      // issuerAddress  
    );

    console.log(`Energy required: ${estimateResult.energy_required}`);

    // إرسال المعاملة الفعلي
    // const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
    //   contractAddress, 
    //   functionSelector, 
    //   {}, 
    //   parameters,  
    //   issuerAddress  
    // );

    // // توقيع المعاملة
    // const signedTransaction = await tronWeb.trx.sign(transaction.transaction, senderPrivateKey);

    // // إرسال المعاملة
    // const broadcastResult = await tronWeb.trx.sendRawTransaction(signedTransaction);
    // console.log('Transaction Hash:', broadcastResult.txid);

    // return {
    //   transactionHash: broadcastResult.txid,
    //   energyRequired: estimateResult.energy_required,
    // };
 
}
}
 
