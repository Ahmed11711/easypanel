import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notfication } from '../entity/notifcation.entity';
import { Repository } from 'typeorm';
import { PaginationService } from 'src/common/pagination/service/pagination.service';
import { getPagination } from 'src/common/pagination.util';
import { INotification } from '../interface/notfication.interface';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';

@Injectable()
export class NotficationService {
  constructor(
    @InjectRepository(Notfication)
    private notfRepo: Repository<Notfication>,
    private readonly paginationService: PaginationService,
  ) {}

  async storeNewNotification(
    userId: number,
    text: string,
    type: string,
  ): Promise<void> {
    const storeNewNotification = this.notfRepo.create({
      user_id: userId,
      text,
      type,
    });

    await this.notfRepo.save(storeNewNotification);
  }

  async getNotifications(query: any, user: IJWTpayload) {
    const conditions = { user_id: user.userId };
    const paginationData = await this.paginationService.paginate(
      this.notfRepo,
      query,
      conditions,
    );

    return paginationData;
  }

  async countSeenNotfication(UserId: number):Promise<{count:number}> {
    const count= await this.notfRepo.count({
      where: { user_id: UserId, seen: 0 },
    });
   return {
    count:count
   }
  }

  async readall(userId: number,id:number):Promise<{message:string}>{

    const update = await this.notfRepo.update(
      { user_id: userId ,id:id},  
      { seen: 1 }          
    );

    return {
      message:"update seen the notfication"
    }}
 
}
