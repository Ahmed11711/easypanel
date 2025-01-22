import { Body, Controller, Post, UseGuards, Param } from '@nestjs/common';
import { CheckDeviceDto } from '../dto/check-device.dto';
import { DeviceService } from '../service/device.service';
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { UpdateDeviceDto } from '../dto/updaed-device.dto';
import { DeleteDeviceDto } from '../dto/delete.device.dto';
import { ManagerGuard } from '../decorator/manger-device.decorator';
 
@Controller('deviceAccess')
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
   ) {}

  @UseGuards(ManagerGuard)
  @Post('approve-device')
  approveForDeviceLogin(
    @GetCurrentUser() user: IJWTpayload,
    @Body() data: CheckDeviceDto,
  ) {
    return this.deviceService.approvedLogin(data, user.userId);
  }

  @Post('my-devices')
  getMyDevices(@GetCurrentUser() user: IJWTpayload) {
    return this.deviceService.getMyDevice(user.userId);
  }

  @UseGuards(ManagerGuard)
  @Post('update-devices')
  updateDevice(
    @Body() data: UpdateDeviceDto,
    @GetCurrentUser() user: IJWTpayload,
  ) {
    return this.deviceService.updateStatusDevice(data, user.userId);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @UseGuards(ManagerGuard)
  @Post('delete-devices')
  deleteDevice(
    @Body() data: DeleteDeviceDto,
    @GetCurrentUser() user: IJWTpayload,
  ) {
    return this.deviceService.deleteDevice(data, user);
  }

  
}
