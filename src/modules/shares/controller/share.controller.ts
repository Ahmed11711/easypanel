import { Controller, Get, Post, Body,Param } from '@nestjs/common';
import { ISPublic } from 'src/modules/auth/decorator/isPublic.decorator';
import { ShareService } from '../service/shares.service';
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { InvestDto } from 'src/modules/wallte/dto/invest.dtot';
import { ShareDto } from '../dto/share.dtot';

@Controller('shares')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @ISPublic()
  @Get()
  allShares() {
    return this.shareService.getAll();
  }

  @Post('invest')
  invest(@Body() data: ShareDto, @GetCurrentUser() user: IJWTpayload) {
    return this.shareService.investment(data, user);
  }

  @Get('histortry')
  historyWallte(@GetCurrentUser() user: IJWTpayload) {
    return this.shareService.hsitoryShare(user);
  }

  @Get('details/:id')
  historyProfite(
    @GetCurrentUser() user: IJWTpayload,
    @Param('id') id: number,
  )
  {
    return this.shareService.profitHistory(user.userId,id)
  }

  
}
