import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  UploadedFile,
  ValidationPipe,
  Get,
  UseInterceptors
} from '@nestjs/common';
 import { FileInterceptor } from '@nestjs/platform-express';

import { CreateUserKycDto } from '../dto/uploadKyc.dto';
 import { Multer } from 'multer';
import { ChangePasswordDto } from 'src/modules/user/dto/change-password-dto';
import { FileValidation } from 'src/Helper/img/decorator/file-Validata.decorator';
import { UserKycService } from '../service/userKyc.service';
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('userKyc')
export class UserKycController {
  constructor(private readonly userKycService: UserKycService) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @GetCurrentUser() user: IJWTpayload,
    @Body() data: CreateUserKycDto,
    @FileValidation() files: Array<Express.Multer.File>,
  ) {
   return this.userKycService.storeKyc(data,files,user);
  }

  @Get('get-my-Kyc')
  getMyKyc(@GetCurrentUser() user: IJWTpayload) {
    return this.userKycService.getMyKyc(user.userId);
  }
}
