import {
  ConflictException,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Device } from '../entity/device.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IDevice } from '../interface/device.interface';
import { v4 as uuidv4 } from 'uuid';
import { CheckDeviceDto } from '../dto/check-device.dto';
import { DeviceStatus } from '../enum/deviceStatus.enum';
import { MangerStatus } from '../enum/mangerAccount.enum';
import { UpdateDeviceDto } from '../dto/updaed-device.dto';
import { DeleteDeviceDto } from '../dto/delete.device.dto';
import { HashService } from 'src/common/HashingData/hash.service';
import { AuthGateway } from 'src/common/WebSocket/test';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepe: Repository<Device>,
    private hashService: HashService,
    private websoket: AuthGateway,
  ) {}

  // stroe new device
  async getMyDevice(userId: number): Promise<IDevice[] | null> {
    return await this.deviceRepe.find({ where: { user_id: userId } });
  }

  async storeNewDevice(
    user_id,
    ip_device,
    device_name,
    active,
    location,
    MangerStatus,
  ): Promise<IDevice | null> {
    const newDevice = this.deviceRepe.create({
      user_id,
      ip_device,
      device_name,
      active,
      transaction_id: await this.hashService.hashText(uuidv4()),
      location,
      MangerStatus,
    });
    await this.deviceRepe.save(newDevice);
    return newDevice;
  }

  // for check the Ip device
  async checkIpDevice(
    userId: number,
    ipDevice: string,
  ): Promise<IDevice | null> {
    const checkDevice = await this.deviceRepe.findOne({
      where: { user_id: userId, ip_device: ipDevice },
    });
    return checkDevice;
  }

  // for approved login system
  async approvedLogin(
    data: CheckDeviceDto,
    userId: number,
  ): Promise<{ message: string }> {
    const checkActived = await this.activeDeviceLogin(
      userId,
      data.transactionId,
    );
    if (checkActived) {
      this.websoket.notifyLoginApproval(data.transactionId);

      return {
        message: 'The phone has been successfully activated for login.',
      };
    } else {
      throw new ConflictException(
        'Transaction ID is either incorrect, or the device is either not activated or blocked. Please verify the details.',
      );
    }
  }

  // update the status device
  async updateStatusDevice(
    data: UpdateDeviceDto,
    userId: number,
  ): Promise<{ message: string }> {
    const getDevice = await this.deviceRepe.findOneBy({
      transaction_id: data.transactionId,
      user_id: userId,
    });
    if (!getDevice) {
      throw new ConflictException(
        'Transaction not found. Please check the transaction ID.',
      );
    }

    if (getDevice.MangerStatus == MangerStatus.MANGER) {
      throw new ConflictException('Not Cant Updted The Manger Device');
    } else {
      const updated = await this.deviceRepe.update(getDevice.id, {
        active: data.active,
      });
      return {
        message: 'updated suucessfull the trnsactions',
      };
    }
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

  // actived the phone and make check too is not Pending
  async activeDeviceLogin(
    userId: number,
    transactionId: string,
  ): Promise<Boolean> {
    const getDevice = await this.deviceRepe.findOne({
      where: { user_id: userId, transaction_id: transactionId },
    });

    if (getDevice && getDevice.active == DeviceStatus.PENDING) {
      await this.deviceRepe.update(getDevice.id, {
        active: DeviceStatus.ACTIVE,
      });
      return true;
    }
    return false;
  }
  // check the manger frist make register this is upline or not
  async checkIsManger(
    ipDevice: string,
    deviceName: string,
    userId: number,
  ): Promise<Boolean> {
    const checkManger = await this.deviceRepe.findOne({
      where: {
        user_id: userId,
        ip_device: ipDevice,
        device_name: deviceName,
        MangerStatus: MangerStatus.MANGER,
      },
    });

    return !!checkManger;
  }

  async getByTrnsactionId(
    transactionId: string,
    userId: number,
  ): Promise<IDevice | null> {
    return await this.deviceRepe.findOneBy({
      transaction_id: transactionId,
      user_id: userId,
    });
  }

  // delete the device
  async deleteDevice(
    data: DeleteDeviceDto,
    user: IJWTpayload,
  ): Promise<{ message: string }> {
    const checkDevice = await this.getByTrnsactionId(
      data.transactionId,
      user.userId,
    );

    if (!checkDevice) {
      throw new NotFoundException(
        'Device not found or transaction ID is invalid',
      );
    }

    if (checkDevice.MangerStatus === MangerStatus.MANGER) {
      throw new ConflictException('Cannot delete a manager device');
    }

    await this.deviceRepe.delete(checkDevice.id);
    return {
      message: 'deleted is successfull',
    };
  }
}
