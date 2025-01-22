import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PinCodeEntity } from '../entity/pinCode.entity';
import { PinCodeDto } from '../dto/pinCode.dto';
import { HashService } from 'src/common/HashingData/hash.service';
import { DeviceService } from 'src/modules/device-access/service/device.service';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { ShowPinCodeDto } from '../dto/show-pinCode.dto';
import { IPinCode } from '../interface/pinCode.interface';
import { UserWallteService } from 'src/modules/user-wallte/service/userWallte.service';

@Injectable()
export class PinCodeService {
  constructor(
    @InjectRepository(PinCodeEntity)
    private readonly pinCodeService: Repository<PinCodeEntity>,
    private hashService: HashService,
    private readonly wallteService: UserWallteService,
  ) {}

  async storePinCode(
    data: PinCodeDto,
    user: IJWTpayload,
  ): Promise<{ message }> {
    const checkIfFound = await this.checlkIsExsiste(user.userId);

    if (checkIfFound) {
      throw new ConflictException('The record already exists.');
    }

    const hashPinCode = await this.hashService.hashText(data.pinCode);

    const createPinCode = this.pinCodeService.create({
      user_id: user.userId,
      pin_code: hashPinCode,
    });

    const storePinCode = await this.pinCodeService.save(createPinCode);

    const crateWallte = await this.wallteService.createWallet(
      user.userId,
      data.pinCode,
    );

    return {
      message: 'success to create pincode',
    };
  }

  async checkVerfied(data: ShowPinCodeDto, user: IJWTpayload) {
    const myPinCode = await this.checlkIsExsiste(user.userId);
    if (!myPinCode) {
      throw new NotFoundException('Plese Insert The Pin Code First');
    }

    const pincode = await this.hashService.verifyText(
      data.pinCode,
      myPinCode.pin_code,
    );
     
    if (pincode) {
      return {
        message: 'The PIN code is correct',
      };
    }
    throw new UnauthorizedException('The PIN code is incorrect');
  }

  async checlkIsExsiste(userId: number): Promise<IPinCode | null> {
    const get = await this.pinCodeService.findOne({
      where: { user_id: userId },
    });
    return get;
  }
}
