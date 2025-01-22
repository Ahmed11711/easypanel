import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from '../entity/otp.entity';
import { MoreThan, Repository } from 'typeorm';
import { generateRandomAlphanumeric } from 'src/common/generateRandomCode/generateCode';
import { UserService } from '../../../modules/user/service/user.service';
import { CheckOtpDto } from '../dto/check-otp.dto';
import { TypeOtp } from '../enum/typeOtp.snum';
import { SendGridService } from 'src/common/Provider/otp/sendGrid/sendgrid.service';
import { RestOtpDto } from '../dto/rest-otp.dto';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    readonly otpRepo: Repository<Otp>,
    readonly sendGridService: SendGridService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  // Store otp and send
  async storeAndSend(
    userId: number,
    email: string,
    type: TypeOtp,
  ): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 6);
    const otpValue = generateRandomAlphanumeric(6);
    const newOtp = this.otpRepo.create({
      otp: otpValue,
      user_id: userId,
      expires_at: expiresAt,
      is_used: false,
      type: type,
    });
    const storeOtp = await this.otpRepo.save(newOtp);
    const sendOtp = this.sendGridService.sendOtp(email, otpValue, type);
  }
  //-----------------------------------------------------------------------------------------------------------------------//
  //resned otp
  async resndOtp(data: RestOtpDto): Promise<{ message: string }> {
    const checkEmail = await this.userService.findOneByEmail(data.email);

    if (!checkEmail) {
      throw new NotFoundException('The Email Is Not Found');
    }
    const sendOtp = await this.storeAndSend(
      checkEmail.id,
      data.email,
      data.typeOtp,
    );

    return {
      message: 'OTP Send Successfully',
    };
  }

  //-----------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------//
  // check otp
  async checkOtp(otpData: CheckOtpDto): Promise<{ message: string }> {
    // check About The Email is Exists
    const checkEmail = await this.userService.findOneByEmail(otpData.email);
    if (!checkEmail) {
      throw new NotFoundException('The Email Is Not Found');
    }

    // verfiy the otp
    const isOtpValid = await this.validateAndUseOtp(
      checkEmail.id,
      otpData.otp,
      otpData.typeOtp,
    );

    if (!isOtpValid) {
      throw new NotFoundException('The OTP is invalid or has expired');
    }
    if (otpData.typeOtp == TypeOtp.REGISTER) {
      await this.verfiedEmail(otpData.email);

      return {
        message: 'The Email Is verfiedEmail ',
      };
    } else {
      return {
        message: 'the otp is success',
      };
    }
    // verfie the email form model user
  }

  //-------------------------------------HELPER----------------------------------------------------------------------------//

  async validateAndUseOtp(
    id: number,
    otp: string,
    type: TypeOtp,
  ): Promise<boolean> {
    const currentTime = new Date();

    const checkOtp = await this.otpRepo.findOne({
      // get last otp flase
      where: {
        user_id: id,
        expires_at: MoreThan(currentTime),
        type: type,
      },
      order: { created_at: 'DESC' },
    });

    if (checkOtp && checkOtp.otp == otp && checkOtp.is_used != true) {
      // update the otp is used
      const updateOtp = await this.otpRepo.update(checkOtp.id, {
        is_used: true,
      });
      return true;
    }
    return false;
  }

  async verfiedEmail(email: string): Promise<void> {
    await this.userService.verfiedEmail(email);
  }

  // to check last otp from same type
  async checkLastVerfied(userId: number, type: TypeOtp): Promise<Boolean> {
    const checkLastVerfed = await this.otpRepo.findOne({
      where: { user_id: userId, type },
      order: { created_at: 'DESC' },
    });
    if (!checkLastVerfed) {
      return false;
    }
    const expiresAt = new Date(checkLastVerfed.expires_at);
    expiresAt.setMinutes(expiresAt.getMinutes() + 3);
    const currentTime = new Date();

    if (checkLastVerfed.is_used === true && currentTime <= expiresAt) {
      return true;
    }

    return false;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async resndOtpForChangePassword(
    data: RestOtpDto,
    user: IJWTpayload,
  ): Promise<{ message: string }> {
    const checkEmail = await this.userService.findOneByEmail(data.email);
    if (checkEmail) {
      throw new NotFoundException('The Email Is Already Exit ');
    }
    const sendOtp = await this.storeAndSend(
      user.userId,
      data.email,
      data.typeOtp,
    );
    return {
      message: 'OTP Send Successfully',
    };
  }
}
