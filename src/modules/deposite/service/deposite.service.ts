import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as crypto from 'crypto';
import { Deposite } from '../entity/deposite.entity';
import { Repository } from 'typeorm';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { IDeposite } from '../interface/deposite.interface';
import { PaginationService } from 'src/common/pagination/service/pagination.service';
import { TypeDeposite } from '../enum/type-deposite.enum';

@Injectable()
export class DepositeService {
  constructor(
    @InjectRepository(Deposite)
    private readonly depositeRpeo: Repository<Deposite>,
    private readonly paginationService: PaginationService,

  ) {}

  async serverTime() {
    const response = await axios.get('https://api.binance.com/api/v3/time');
    return response.data.serverTime;
  }

  async checkTextid(userId, textId: string) {
    const myTextId = await this.checkTextIdInDatabase(textId);
    // if (myTextId && myTextId.status == true) {
    //   throw new ConflictException('The Text ID Is Already Token');
    // } else {
    //   const checkBinace = await this.checkInBinance();

    //   if (checkBinace) {
    //   }
    // }
  }
  async checkInBinance() {
    const apiKey = process.env.API_KEY_DEPOSITE;

    const apiSecret = process.env.KEY_SECRT_DEPOSITE;

    // Binance API endpoint
    const endpoint = 'https://api.binance.com/sapi/v1/capital/deposit/hisrec';

    // Prepare query parameters
    const timestamp = await this.serverTime();
    const queryParams = `timestamp=${timestamp}`;

    // Generate the signature
    const signature = crypto
      .createHmac('sha256', apiSecret)
      .update(queryParams)
      .digest('hex');

    try {
      const response = await axios.get(
        `${endpoint}?${queryParams}&signature=${signature}`,
        {
          headers: {
            'X-MBX-APIKEY': apiKey,
          },
        },
      );

      return response.data;
    } catch (err) {
      console.log('sending email for support to check API AND SECRT KEY');
      return err;
    }
  }

  async checkTextIdInDatabase(textId) {
    const textid = await this.depositeRpeo.findOne({
      where: { textId: textId },
    });

    return textid;
  }
  async storeInDatabase(checkBinace, user_id) {

    const data = checkBinace.token_info;
    const newDeposite = this.depositeRpeo.create({
      amount: checkBinace.value / 1000000,
      textId: checkBinace.transaction_id,
      network: data.address,
      status: true,
      from: checkBinace.from,
      to: checkBinace.to,
      user_id: user_id,
      type:TypeDeposite.BLCOKCHAIN
    });

    await this.depositeRpeo.save(newDeposite);
  }

  async findByAddress(address) {
    const getTansaction = await this.depositeRpeo.find({
      where: { to: address },
    });
    console.log(1);

    return getTansaction;
  }

  async allTransaction(query: any, user: IJWTpayload) {
  
     const conditions = { user_id: user.userId };
    const paginationData = await this.paginationService.paginate(
      this.depositeRpeo,
      query,
      conditions,
      ['id', 'amount','status','type','created_at'] 
    );
    return paginationData
 
  }

  
}
 

 