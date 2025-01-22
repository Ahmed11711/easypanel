import { Controller, Get, Post, Query,Param } from '@nestjs/common';
import { NotficationService } from '../service/notication.service';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';

@Controller('notfications')
export class NotficationController {
  constructor(private readonly notficationService: NotficationService) {}

  @Post()
  async getNotifications(
    @Query() query: any,
    @GetCurrentUser() user: IJWTpayload,
  ) {
    return this.notficationService.getNotifications(query, user);
  }


  @Get('count-notfication')
  countNotficationUnSeen(@GetCurrentUser() user: IJWTpayload)
  {
    return this.notficationService.countSeenNotfication( user.userId);
  }
  @Get('mark-notification/:id')
  updateSeen(
    @Param('id') id: number,  
    @GetCurrentUser() user: IJWTpayload  
  ) {
 
    return this.notficationService.readall(user.userId,id);
  }
}
