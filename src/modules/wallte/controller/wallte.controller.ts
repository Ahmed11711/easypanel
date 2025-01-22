import { Controller, Get, Post,Query ,Body,Param} from '@nestjs/common';
import { WalletService } from '../service/wallte.service';
import {WallteTypeDto} from '../dto/wallteType.dto';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';
import { InvestDto } from '../dto/invest.dtot';
 
@Controller('wallte')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  getAll(@Body() data:WallteTypeDto) {
 
    return this.walletService.getWallte(data);
  }

  @Get('recommended')
  recommendedWallte(){
    return this.walletService.recommendedWallte();

  }

  @Post('histortry')
  historyWallte(@GetCurrentUser() user:IJWTpayload){
    return this.walletService.hsitoryWallte(user);
  }

  @Get('details/:id')
  historyProfite(
    @GetCurrentUser() user: IJWTpayload,
    @Param('id') id: number,
  )
  {
    return this.walletService.profitHistory(user.userId,id)
  }

  

  @Post('invest')
  invest(@Body() data :InvestDto ,@GetCurrentUser() user:IJWTpayload){
 
    // return user;
     return this.walletService.investment(data,user)
  }
 
}
