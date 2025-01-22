import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PinCodeService } from '../service/pinCode.service';
import { PinCodeDto } from '../dto/pinCode.dto';
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { ShowPinCodeDto } from '../dto/show-pinCode.dto';
import { ManagerGuard } from 'src/modules/device-access/decorator/manger-device.decorator';

@Controller('pin-code')
export class PinCodeController {
  constructor(private readonly PinCodeService: PinCodeService) {}

  // @UseGuards(ManagerGuard)
  @Post('create')
  async getAll(@Body() data: PinCodeDto, @GetCurrentUser() user: IJWTpayload) {
    return this.PinCodeService.storePinCode(data, user);
  }

  @Post('ckeck-pinCode')
  async checkPinCode(
    @Body() data: ShowPinCodeDto,
    @GetCurrentUser() user: IJWTpayload,
  ) {
    return this.PinCodeService.checkVerfied(data, user);
  }
}
