import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserWallteService } from '../service/userWallte.service';
import { ISPublic } from 'src/modules/auth/decorator/isPublic.decorator';
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { passwordWallte } from '../dto/create-randam-wallte.dto';
// import { ISPublic } from '../decorator/isPublic.decorator';


@Controller('web3')
export class UserWallteController {
  constructor(private readonly userWallteService: UserWallteService) {}

  @Post('create-waltes')
  create(@GetCurrentUser() user: IJWTpayload,@Body() data:passwordWallte) {
    return this.userWallteService.createWallet(user.userId,data.password);
  }

  //   @ISPublic()
  // @Post('create-waltes2')
  // create2(@GetCurrentUser() user: IJWTpayload,@Body() data:passwordWallte) {
  //   const ntes="resource absurd yellow reduce home tilt deposit blind lesson zone asset cargo"
  //   return this.userWallteService.getPrivateKeyFromMnemonic(ntes,data.password);
  // }


  @Get('get-transaction')
  getTrnsaction(@GetCurrentUser() user: IJWTpayload) {
    return this.userWallteService.getTransactionLogs(user.userId);
  }

  @Get('my-address')
  myAddress(@GetCurrentUser() user:IJWTpayload){
    return this.userWallteService.myAddress(user) ;
  }
  //  @ISPublic()
  @Post('send-usdt')
  myWallte(@GetCurrentUser() user:IJWTpayload,@Body() data)
  {
    // // (fromAddress: string, toAddress: string, amount: number, privateKey: string) 
    //  const fromAddress="TN2rK17VLMWGjT2vxz3EiqFJPFpGBeUHu9";
    //  const privateKey="a70f57c5eaf9210f01113edea6c73c13c1ced2dcd216c1b3d6643784d746e527";
    // const toAddress="TSaM4syJSdp3w72uZK7SBeFtDe3bMpG8qf";
    // const amount=1;
    
    // const usdtContractAddress = 'THPvaUhoh2Qn2y9THCZML3H815hhFhn5YC'; 
    // // // return this.userWallteService.sendTRX(fromAddress,toAddress,1,privateKey );
    // return this.userWallteService.sendTRC20( toAddress,data.amount,user.userId,privateKey);
  }

  @Post('credantional-wallte')
  async credantionalWallte(@GetCurrentUser() user:IJWTpayload){

    return this.userWallteService.myWallteCredantiona(user.userId);
  }

  @Get('my-balance-of-tron')
  async getMyBlanceOfTron(@GetCurrentUser() user:IJWTpayload){
    // console.log(555);
    return await this.userWallteService.myBlnceOfTron(user.userId);

    }


    @Post('send-usdt22')
    myWalltes(@GetCurrentUser() user:IJWTpayload,@Body() data)
    {
      // // (fromAddress: string, toAddress: string, amount: number, privateKey: string) 
       const fromAddress="TN2rK17VLMWGjT2vxz3EiqFJPFpGBeUHu9";
       const privateKey="a70f57c5eaf9210f01113edea6c73c13c1ced2dcd216c1b3d6643784d746e527";
      const toAddress="TSaM4syJSdp3w72uZK7SBeFtDe3bMpG8qf";
      const amount=1;
      
      const usdtContractAddress = 'THPvaUhoh2Qn2y9THCZML3H815hhFhn5YC'; 
      // // return this.userWallteService.sendTRX(fromAddress,toAddress,1,privateKey );
      return this.userWallteService.sendTransactionAndEstimateEnergy( privateKey,usdtContractAddress,toAddress,amount);
    }
  
}