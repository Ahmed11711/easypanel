import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { userLoginDto } from '../dto/login.dto';
import { DeviceService } from 'src/modules/device-access/service/device.service';
import { NotficationService } from 'src/modules/notfication/service/notication.service';
import { LOGIN_MESSAGES } from 'src/common/MessageNotfication/message';
import { NotficationType } from 'src/modules/notfication/enum/notifaction.enum';
import { DeviceStatus } from 'src/modules/device-access/enum/deviceStatus.enum';
import { SendGridService } from 'src/common/Provider/otp/sendGrid/sendgrid.service';
import { HashService } from 'src/common/HashingData/hash.service';
import { MangerStatus } from 'src/modules/device-access/enum/mangerAccount.enum';
import { IDevice } from 'src/modules/device-access/interface/device.interface';
import { IUser } from 'src/modules/user/interface/user.interface';
import { TypeOtp } from 'src/modules/otp/enum/typeOtp.snum';
import { StatusUser } from 'src/modules/user/enum/status.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private deviceService: DeviceService,
    private notficationService: NotficationService,
    private sendGridService: SendGridService,
    private hashService: HashService,
  ) {}

  async validatedUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
     console.log(password);
 



    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      
      return result;
      
    }
    return null;
  }
  async login(userLoginDto: userLoginDto) {
    const user = await this.validatedUser(
      userLoginDto.email,
      userLoginDto.password,
    );
    console.log(user)
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // check Verfided Email
    if (user.email_verified_at == null) {
      throw new ForbiddenException(
        'Your email is not verified. Please verify your email to proceed.',
      );
    }

   if( user.status == StatusUser.DEOVLPER)
   {
    const payload = {
      userId: user.id,
      email: user.email,
      MangerStatus: MangerStatus.MANGER,
      // status:user.status,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1500m', // Short-lived access token
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d', // Longer-lived refresh token
    });

    return {
      accessToken,
      refreshToken,
    };

   }









    // check The Ip Device Stauts
    const checkDevice = await this.checkStatusDevice(user, userLoginDto);
    // console.log(checkDevice);

    
    

    if (checkDevice.success == false ) {
      return {
        hash: checkDevice.hash,
      };
    }

    const payload = {
      userId: user.id,
      email: user.email,
      MangerStatus: checkDevice.MangerStatus ?? 'guest',
      // status:user.status,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1500m', // Short-lived access token
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d', // Longer-lived refresh token
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string } | { message: string }> {
    try {
      // Verify the refresh token
      const checkTokenRefresh = this.jwtService.verify(refreshToken);

      if (!checkTokenRefresh) {
        throw new ConflictException('Invalid refresh token');
      }

      const user = await this.userService.findByIdVulnerable(
        checkTokenRefresh.userId,
      );

      if (!user) {
        throw new ConflictException('The user is not found');
      }

      // Generate a new access token
      const payload = {
        userId: user.id,
        email: user.email,
      };
      const newAccessToken = this.jwtService.sign(payload, {
        expiresIn: '60m', // Short-lived access token
      });

      // Return the new access token
      return { accessToken: newAccessToken };
    } catch (error) {
      // Handle specific JWT errors
      if (error.name === 'JsonWebTokenError') {
        throw new ConflictException('Refresh token has expired OR Wrong Token');
      } else if (error.name === 'TokenExpiredError') {
        throw new ConflictException(
          'The refresh token is expired. Please log in again',
        );
      }

      // Handle other unexpected errors
      throw new ConflictException('Could not refresh token:');
    }
  }

  async checkStatusDevice(
    user: IUser,
    userLoginDto: userLoginDto,
  ): Promise<{ success: boolean; hash: string; MangerStatus?: string }> {
    const checkStatusDevice = await this.deviceService.checkIpDevice(
      user.id,
      userLoginDto.ip_device,
    );

    if (!checkStatusDevice) {
      // if new device Login
      const hashCode = await this.handleUnusualLoginAttempt(user, userLoginDto);
      return {
        success: false,
        hash: hashCode,
      };
    } else {
      // if  device Login check Status
      const handleDeviceStatus =
        await this.handleDeviceStatus(checkStatusDevice);

      return {
        success: handleDeviceStatus.success,
        hash: handleDeviceStatus.hash,
        MangerStatus: handleDeviceStatus.MangerStatus,
      };
    }
  }
  // handel device IF found
  private async handleUnusualLoginAttempt(
    user: IUser,
    userLoginDto: userLoginDto,
  ): Promise<string> {
    const textMessageForMail = LOGIN_MESSAGES.UNUSUAL_LOGIN_ATTEMPT_MAIL(
      userLoginDto.device_name,
    );
    const textMessageForNotification =
      LOGIN_MESSAGES.UNUSUAL_LOGIN_ATTEMPT_NOTFICATION(
        userLoginDto.device_name,
      );

    await this.notficationService.storeNewNotification(
      user.id,
      textMessageForNotification,
      NotficationType.login,
    );

    const newDevice = await this.deviceService.storeNewDevice(
      user.id,
      userLoginDto.ip_device,
      userLoginDto.device_name,
      DeviceStatus.PENDING,
      userLoginDto.location,
      MangerStatus.GUEST,
    );

    this.sendGridService.sendOtp(
      user.email,
      textMessageForMail,
      TypeOtp.SECURE,
    );

    return newDevice.transaction_id;
  }
  // handel device IF found
  private async handleDeviceStatus(
    device: IDevice,
  ): Promise<{ success: boolean; hash: string; MangerStatus?: string }> {
    if (device.active === DeviceStatus.PENDING) {
      return {
        success: false,
        hash: device.transaction_id,
      };
    }

    if (device.active === DeviceStatus.BLOCK) {
      throw new ConflictException('The transaction for thie device is BLOCK');
    }

    if (device.active === DeviceStatus.ACTIVE) {
      return {
        success: true,
        hash: '',
        MangerStatus: device.MangerStatus,
      };
    }

    throw new NotFoundException('Device status not recognized');
  }
}
