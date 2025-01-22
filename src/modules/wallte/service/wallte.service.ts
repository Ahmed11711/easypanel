import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../entity/wallet.entity';
import { Repository } from 'typeorm';
import { WallteTypeDto } from '../dto/wallteType.dto';
import { BuyWallet } from '../entity/buyWallet.entity';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { ProfitWallte } from '../entity/profitWallte.entity';
import { InvestDto } from '../dto/invest.dtot';
import { UserService } from 'src/modules/user/service/user.service';
import { userLoginDto } from 'src/modules/auth/dto/login.dto';
import { generateRandomAlphanumeric } from 'src/common/generateRandomCode/generateCode';
import { typeWallte } from '../enum/wallte.enum';
import { PdfService } from 'src/common/generatePdf/create-pdf.service';
import { IUser } from 'src/modules/user/interface/user.interface';
import { ShareService } from 'src/modules/shares/service/shares.service';
import axios from 'axios';
import { ContractService } from '../../contract/service/contract.service';
import { AffiliateService } from '../../affiliate/service/Affiliate.service';
import { DataSource } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly wallteRepo: Repository<Wallet>,
    @InjectRepository(BuyWallet)
    private readonly buyWallteRepositry: Repository<BuyWallet>,
    @InjectRepository(ProfitWallte)
    private readonly profitWallteRepositry: Repository<ProfitWallte>,
    private readonly userService: UserService,
    private readonly pdfService: PdfService,
    private readonly shareService: ShareService,
    private readonly contractService: ContractService,
    private readonly affiliateService: AffiliateService,
    private dataSource: DataSource,
  ) {}

  async getWallte(data: any) {
    const wallets = await this.wallteRepo.find({
      where: { type: data.type },
      relations: ['project'],
    });
    return wallets;
  }

  async recommendedWallte() {
    const wallets = await this.wallteRepo.find({
      relations: ['project'],
      order: { id: 'DESC' },
      take: 3,
    });
    return wallets;
  }

  async hsitoryWallte(user: IJWTpayload) {
    const wallet = await this.buyWallteRepositry.find({
      where: { user_id: user.userId },
      relations: ['wallte'],
    });

    const shares = await this.shareService.hsitoryShare(user);
    // Add 'type' field to each share record
    const updatedShares = shares.map((share) => ({
      ...share, // Spread the share data
      type: 'stock', // Add type to share records
    }));

    // Combine the wallet and updated share data into one array
    const combinedResults = [
      ...wallet, // Wallet data
      ...updatedShares, // Share data with added type
    ];

    // Return the combined result
    return combinedResults;
  }

  async profitHistory(userId: number, id: number) {
    const wallets = await this.buyWallteRepositry.find({
      where: { user_id: userId, id: id },

      relations: ['wallte.devolper', 'myProfit', 'contracts'],
    });

    return wallets;
  }

  async investment(data: InvestDto, user: IJWTpayload) {
    const id = data.idWallet;
    const totalCost = data.amount;
    // const numberUnitBuy = data.numberUnit; // ++
    const numberUnitBuy = 1; // 

    // Check if the wallet exists
    const wallet = await this.wallteRepo.findOneBy({ id });

    if (!wallet) {
      throw new ConflictException(`Wallet with ID ${id} not found`);
    }
    // Check if the wallet has enough units
    // const availableUnite = Number(numberUnitBuy) + Number(wallet.sold);  // ++
    // Check if available units are sufficient
    // if (wallet.number_of_unit < availableUnite) {   // ++
    //   throw new ConflictException(`Wallet  does not have sufficient units`);
    // }
    // Check if the wallet has expired
    if (new Date(wallet.expire_date) < new Date()) {
      throw new ConflictException(`Wallet with ID ${id} has expired`);
    }


    const userForBuy = await this.userService.getUserById(user.userId);

    if (!userForBuy) {
      throw new ConflictException(
        `The user with ID ${user.email} was not found.`,
      );
    }

    // const totalCost = numberUnitBuy * wallet.price;

    if (userForBuy.money < totalCost) {
      throw new ConflictException(
        `User with ID ${user.email} does not have sufficient funds. Required: ${totalCost}, Available: ${userForBuy.money}`,
      );
    }
   

      // Start transaction
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.startTransaction();
  
      try {
          // 1- create Transaction For Processing
          const createhistory = await this.createBufferUser(
              user.userId, wallet.id, totalCost, numberUnitBuy, wallet.peryears, wallet.type, wallet.profitDistributed, queryRunner
          );
  
          // 2- create pdf Contract
          const createPdf = await this.createPdf(user.userId, createhistory.id, queryRunner);
  
          // 3- update Wallet
          // const updateWallet = await this.updateWallet(wallet, numberUnitBuy, queryRunner);
  
          // 4- update money from userService
          const updateMoney = await this.updateMoney(user, totalCost, queryRunner);
  
          // 5- create new Affiliate
          // const checkAffiliate = await this.createAffiliateHistory(user.userId, userForBuy.comming_afflite, numberUnitBuy, totalCost, wallet.id, queryRunner); // ++
  
          // Commit transaction if all operations are successful
          await queryRunner.commitTransaction();
  
          return { message: 'Investment successful' };
      } catch (error) {
          // If any error occurs, rollback the transaction
          await queryRunner.rollbackTransaction();
          throw error;  // Re-throw the error after rollback
      } finally {
          // Release the query runner
          await queryRunner.release();
      }
    }  

  async createBufferUser(
    userId: number,
    bufferId: number,
    totalCost: number,
    numberUnitBuy: number,
    peryears: number,
    type,
    profit,
    queryRunner,
  ) {
    const currentDate = new Date();
    const endDate = new Date();
    endDate.setDate(currentDate.getDate() + peryears);
    

    const create = this.buyWallteRepositry.create({
      user_id: userId,
      buffer_id: bufferId,
      start_subscrip: currentDate,
      end_subscrip: endDate,
      amount: totalCost,
      num_unite: numberUnitBuy,
      active: true,
      peryears: peryears,
      HashID: generateRandomAlphanumeric(25),
      type: type,
      profit: profit,
    });
     
    return await queryRunner.manager.save(create);

    // return await this.buyWallteRepositry.save(create);
  }

  async createPdf(userId: number, bufferId: number, queryRunner) {
    const response = await axios.get(
      'https://invest-dashboard-api.smartidea.tech/api/create-contract',
    );
    const pathUrl = response.data.file_url ?? null;
    const HashID = generateRandomAlphanumeric(15);
    await this.contractService.createContract(
      userId,
      bufferId,
      pathUrl,
      HashID,
      queryRunner,
    );
  }
  async updateWallet(wallet, numberUnitBuy: number, queryRunner) {
    const totalSold = Number(wallet.sold) + Number(numberUnitBuy);

    // Update the sold field with the new total value
    wallet.sold = totalSold;
    if (totalSold >= wallet.number_of_unit) {
      wallet.active = false;
    }

 
    await queryRunner.manager.save(wallet);

     const save= await this.wallteRepo.save(wallet);  // Use the repository's save method
  }
  async updateMoney(user: IJWTpayload, totalCost: number, queryRunner) {
    const totelCost = await this.userService.checkmyMoneyWithUpdateForBuy(
      user,
      totalCost,
      queryRunner,
    );
  }

  async createAffiliateHistory(
    userId: number,
    commingAfflite: string,
    numberUnitBuy: number,
    totalCost: number,
    walletId: number,
    queryRunner,
  ) {
    const firstUpline =
      await this.userService.getUserByAffiliate(commingAfflite);
    if (!firstUpline) {
      return true;
    }

    const gen1 = 1;

    await this.affiliateService.handelAffiliate(
      userId,
      firstUpline.id,
      numberUnitBuy,
      totalCost,
      walletId,
      1,
      queryRunner,
    );
    await this.addReward(gen1, firstUpline.id, 250, queryRunner);

    const secoundUpline = await this.userService.getUserByAffiliate(
      firstUpline.comming_afflite,
    );
    if (!secoundUpline) {
      return true;
    }
    const gen2 = 2;
    await this.affiliateService.handelAffiliate(
      userId,
      secoundUpline.id,
      numberUnitBuy,
      totalCost,
      walletId,
      2,
      queryRunner,
    );
    await this.addReward(gen2, secoundUpline.id, 150, queryRunner);
  }

  async addReward(gen: number, uplineId: number, amount: number, queryRunner) {
    const reward = await this.affiliateService.getAllRewardByGen(gen);

    await this.userService.addMoneyReward(uplineId, amount, queryRunner);
  }
}
