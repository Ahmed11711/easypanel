import { Body, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Share } from '../entity/share.entity';
import { ShareUser } from '../entity/shareUser.entity';
import { Repository } from 'typeorm';
import { IShare } from '../interface/share.interface';
import { InvestDto } from 'src/modules/wallte/dto/invest.dtot';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { UserService } from '../../user/service/user.service';
import { generateRandomAlphanumeric } from 'src/common/generateRandomCode/generateCode';
import { TypeStatusShare } from '../enum/share.enum';
import { IUser } from 'src/modules/user/interface/user.interface';
import { EntityManager } from 'typeorm';
import { DataSource } from 'typeorm';
import { ShareDto } from '../dto/share.dtot';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(Share)
    private readonly SharesRepository: Repository<Share>,
    @InjectRepository(ShareUser)
    private readonly ShareUserRepository: Repository<ShareUser>,
    private readonly userService: UserService,
    private dataSource: DataSource,

    // private readonly investmentGateway: InvestMent, // Inject Gateway
  ) {}

  async hsitoryShare(user: IJWTpayload) {
    return await this.ShareUserRepository.find({
      where: { user_id: user.userId },
      relations: ['share'],
    });
  }

  // get all shares
  async getAll(): Promise<IShare[]> {
    return await this.SharesRepository.find();
  }
  async investment(data: ShareDto, user: IJWTpayload) {
    const shareId = data.idWallet;
    const numberUnitBuy = data.numberUnit;

    // Check if the Share exists
    const share = await this.validateShare(shareId, numberUnitBuy);

    // run websocket
    // this.investmentGateway.notifyAvailableUnits("clientId", share.availableShare);

    // Check if the user exists
    const userForBuy = await this.validateUser(user.userId, user.email);

    const queryRunner = this.dataSource.createQueryRunner(); // for make query transaction
    await queryRunner.startTransaction();

    try {
      // check the money for user

      const totalCost = numberUnitBuy * share.price;
      await this.validateUserFunds(userForBuy.money, totalCost, user.email);
      // create UserInvest
      await this.createInvestmentHistory(
        user.userId,
        share,
        totalCost,
        numberUnitBuy,
        queryRunner,
      );

      // updated share
      await this.updateShareData(share, numberUnitBuy, queryRunner);

      //  update money for user
      await this.updateUserFunds(user, totalCost, queryRunner);
      await queryRunner.commitTransaction();

      return {
        message: 'Investment successful',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // check validateShare
  private async validateShare(
    id: number,
    numberUnitBuy: number,
  ): Promise<IShare> {
    const share = await this.SharesRepository.findOneBy({ id });

    if (!share) {
      throw new ConflictException(`Share with ID ${id} was not found.`);
    }

    const availableUnits = Number(numberUnitBuy) + Number(share.sold);
    if (share.availableShare < availableUnits) {
      throw new ConflictException(
        `Share with ${share.name} does not have sufficient units`,
      );
    }

    if (new Date(share.expireDate) <= new Date()) {
      throw new ConflictException(`Share with ID ${id} has expired.`);
    }

    return share;
  }
  // check validateUser
  private async validateUser(userId: number, email: string): Promise<IUser> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new ConflictException(
        `The user with email ${email} was not found.`,
      );
    }
    return user;
  }
  // check validateUserFunds
  private async validateUserFunds(
    availableFunds: number,
    totalCost: number,
    email: string,
  ): Promise<void> {
    if (availableFunds < totalCost) {
      throw new ConflictException(
        `User with email ${email} does not have sufficient funds. Required: ${totalCost}, Available: ${availableFunds}`,
      );
    }
  }
  // create new investment
  private async createInvestmentHistory(
    userId: number,
    share: IShare,
    totalCost: number,
    numberUnitBuy: number,
    queryRunner,
  ) {
    const currentDate = new Date();
    const history = this.ShareUserRepository.create({
      user_id: userId,
      share_id: share.id,
      start_subscrip: currentDate,
      end_subscrip: null,
      amount: totalCost,
      num_unite: numberUnitBuy,
      status: true,
      HashID: generateRandomAlphanumeric(25),
      profit: share.profit,
    });
    await queryRunner.manager.save(history);

    // await this.ShareUserRepository.save(history);
  }
  // create new update share
  private async updateShareData(
    share: any,
    numberUnitBuy: number,
    queryRunner,
  ) {
    const totalSold = Number(share.sold) + Number(numberUnitBuy);
    share.sold = totalSold;

    if (totalSold >= share.availableShare) {
      share.status = TypeStatusShare.COMPLETED;
    }
    await queryRunner.manager.save(share);

    // await this.SharesRepository.save(share);
  }
  // create new update user

  private async updateUserFunds(
    user: IJWTpayload,
    totalCost: number,
    queryRunner,
  ) {
    await this.userService.UpdateMoneyForBuy(user, totalCost, queryRunner);
  }

  async profitHistory(userId:number,id:number){
    
    const wallets = await this.ShareUserRepository.find({
      where: { user_id: userId,id:id },
  
      relations: ['profitShare','share'], 
    });

    return wallets;

  }
}
