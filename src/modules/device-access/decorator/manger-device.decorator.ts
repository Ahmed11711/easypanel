import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MangerStatus } from '../enum/mangerAccount.enum';
import { StatusUser } from 'src/modules/user/enum/status.enum';

@Injectable()
export class ManagerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // console.log(user);
    // open for deovlper for test the app

    // if(user.status ==StatusUser.DEOVLPER){
    //   return true
    // }
      
    if (user.MangerStatus !== MangerStatus.MANGER) {
      throw new ForbiddenException(
        'Only the primary account holder is authorized to make this modification.',
      );
    }

    return true;
  }
}
