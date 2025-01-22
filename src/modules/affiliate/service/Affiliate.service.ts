import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MarketingFees } from "../entity/affilite.entity";
import { Repository } from "typeorm";
import { IMarketingFees } from "../interface/affiliate.interface";
import { RewardAffiliate } from "../entity/RewardAffiliate";

@Injectable()
export class AffiliateService{

    constructor(
        @InjectRepository(MarketingFees)
        private readonly affiliateRepository:Repository<MarketingFees>,
        @InjectRepository(RewardAffiliate)
        private readonly RewardAffiliateRepository:Repository<RewardAffiliate>
    ){}


    async getAffiliatesByGeneration(userId: number, gen: number): Promise<IMarketingFees[] | []> {
      try {
        return await this.affiliateRepository.find({
          where: { upline_id: userId, generations: gen },   
          relations: ['user'],
          select: {
            user: {
              id: true,
              name: true,
              email: true,
              img: true,
            },
          },
        });
      } catch (error) {
        console.error(`Error fetching generation ${gen} affiliates: `, error);
        return [];
      }
    }

    async getRewardByGen(gen: number) {
      try {
        return await this.RewardAffiliateRepository.findOne({
          where: { gen },
        });
      } catch (error) {
        console.error(`Error fetching reward for generation ${gen}: `, error);
        return null;
      }
    }
    
   
   
    async handelAffiliate(userId:number,uplineId:number,numuUnit:number,amount:number,bufferId:number,gen:number,queryRunner)
    {
      let reward;

       if (gen === 1) {
        reward = await this.getAllRewardByGen(1);   
      } else {
        reward = await this.getAllRewardByGen(2);   
      }
    
       if (!reward) {
        throw new Error(`No reward found for gen: ${gen}`);
      }
      
       
      const profitUsers = numuUnit * reward.reward;
      
      

    
       const createNewAffiliate = this.affiliateRepository.create({
        user_id: userId,
        upline_id: uplineId,
        amount: amount,
        buffer_id: bufferId,
        generations: gen,
        num_unit: numuUnit,
        profit_users: profitUsers   
      });
    

       await queryRunner.manager.save(createNewAffiliate);

        // await queryRunner.manager.save(craeteNewAffiliate);

        // await this.affiliateRepository.save(craeteNewAffiliate)
    }

    getAllReward(){
      return this.RewardAffiliateRepository.find();
    }

    getAllRewardByGen(gen:number){
      return this.RewardAffiliateRepository.findOne({
        where: { gen: gen },
      });
    
    }


    // async reponse(userId){

    //   const genration1=await this.getAllRewardByGen(1)
    //   const genration2=await this.getAllRewardByGen(2)

    //   "data" => [
    //     'direct' => [
    //         'target' => genration1.target,
    //         'salary'=>genration1.salary,
    //         // 'user_salary'=>genration1.,
    //         'reward' => genration1.reward, 
    //         'user' => await this.getAll(userId)
            
    //     ], 'indirect' => [
    //         'target' => genration2.target,
    //         'salary'=>genration2.salary,
    //           // 'user_salary'=>0,
    //         'commission' => genration2.reward, 
    //         'user' => await this.getAll(userId)
    //     ]
    // ]
    // }

    async getResponse(userId: number) {
      try {
        // Fetch rewards for generation 1 and 2 concurrently
        const [genration1, genration2] = await Promise.all([
          this.getRewardByGen(1),
          this.getRewardByGen(2),
        ]);
    
        // Ensure both genration data are available
        if (!genration1 || !genration2) {
          throw new Error('Failed to retrieve generation data');
        }
    
        // Fetch direct (gen 1) and indirect (gen 2) affiliates separately
        const directAffiliates = await this.getAffiliatesByGeneration(userId, 1);  // For Generation 1
        const indirectAffiliates = await this.getAffiliatesByGeneration(userId, 2);  // For Generation 2
    
        return {
          data: {
            direct: {
              target: genration1.target,
              salary: genration1.salary,
              reward: genration1.reward,
              userSalary:0,
              user: directAffiliates,
            },
            indirect: {
              target: genration2.target,
              salary: genration2.salary,
              reward: genration2.reward,
              userSalary:0,
              user: indirectAffiliates,
            },
          },
        };
      } catch (error) {
        console.error('Error generating response: ', error);
        return {
          data: {
            direct: {},
            indirect: {},
          },
        };
      }
    }
  }