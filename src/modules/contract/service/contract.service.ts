import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContractEntity } from "../entity/contract.entity";
import { Repository } from "typeorm";
import { IJWTpayload } from "src/modules/auth/interface/login.payload";
import { IContract } from "../interface/contract.interface";
import { BuyWallet } from "src/modules/wallte/entity/buyWallet.entity";  

@Injectable()
export class ContractService {

  constructor(
    @InjectRepository(ContractEntity)
    private readonly contractRepositry: Repository<ContractEntity>,
 
  ) {}


  async getContractsWithBuyWallte(userId: number) {
     const contracts = await this.contractRepositry.find({
      where: { user_id: userId },
      relations: ['buyWallet'],  
    });

  
    return contracts;
  }

  async getAllDetails(id:number,userId:number){

    
    const contracts = await this.contractRepositry.find({
        where: { user_id: userId,id:id },
        relations: ['buyWallet.myProfit'],  
      });

      return contracts;
  }

  async createContract(userId:number,bufferId:number,pathUrl:string,HashID:string,queryRunner){

    const createWallet=this.contractRepositry.create({
      user_id:userId,
      buffer_user_id:bufferId,
      contract:pathUrl,
      status:true,
      HashID:HashID,
    });
 
    await queryRunner.manager.save(createWallet);

    // await this.contractRepositry.save(createWallet)
  }
}
