import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { generateRandomAlphanumeric } from 'src/common/generateRandomCode/generateCode';
import { OtpService } from 'src/modules/otp/service/otp.service';
import { DeviceService } from 'src/modules/device-access/service/device.service';
import { DeviceStatus } from 'src/modules/device-access/enum/deviceStatus.enum';
import { MangerStatus } from '../../device-access/enum/mangerAccount.enum';
import { TypeOtp } from 'src/modules/otp/enum/typeOtp.snum';
import { ChangePasswordDto } from 'src/modules/user/dto/change-password-dto';
import { IUser } from '../interface/user.interface';
import { IMe } from '../interface/me.interface';
import { NotficationService } from 'src/modules/notfication/service/notication.service';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { ForgetPasswordDto } from 'src/modules/user/dto/forget-password-dtp';
import { HashService } from 'src/common/HashingData/hash.service';
import { ChangeEmailDto } from '../dto/change-email-dto';
import { ChangeProfileDto } from '../dto/change-profile-dto';
import { FileService } from 'src/Helper/img/service/file-upload.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @Inject(forwardRef(() => OtpService))
    private otpRepo: OtpService,
    private deviceService: DeviceService,
    private notficatiosService: NotficationService,
    private readonly hashService: HashService,
    private readonly fileService: FileService,
  ) {}
  async create(userData: CreateUserDto): Promise<{ message: string }> {
    // Check if the email already exists
    const emailExists = await this.isEmailExists(userData.email);
    if (emailExists) {
      throw new NotFoundException('Email already Exists');
    }

    // Check if the affiliate code
    const comming_afflite = await this.checkCommingAfflite(
      userData.comming_afflite,
    );

    const affiliate_code = await this.createAffliteCode();

    // Hash the password
    const hashedPassword = await this.hashPassword(userData.password);

    // Create a new user object
    const newUser = this.userRepo.create({
      ...userData,
      affiliate_code: affiliate_code,
      comming_afflite: comming_afflite,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await this.userRepo.save(newUser);
    // send a random OTP for email
    const sendOtp = await this.otpRepo.storeAndSend(
      savedUser.id,
      savedUser.email,
      TypeOtp.REGISTER,
    );

    // Store Info Device
    const device = this.deviceService.storeNewDevice(
      savedUser.id,
      userData.ipDevice,
      userData.deviceName,
      DeviceStatus.ACTIVE,
      userData.location,
      MangerStatus.MANGER,
    );

    return {
      message: 'Registration successful. Please check your OTP',
    };
  }

  async findOneByEmail(email: string): Promise<IUser> {
    return await this.userRepo.findOneBy({ email });
  }

  async me(id: number, MangerStatus: MangerStatus): Promise<IMe | null> {
    // Fetch the user along with related 'userKyc' and 'pinCode' data

    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['userKyc', 'pinCode'],
      select: {
        userKyc: {
          active: true,
        },
        pinCode: {
          active: true,
        },
      },
    });
    // for add notifications
    if (user) {
      (user as any).notificationsCount = {
        count: await this.notficatiosService.countSeenNotfication(id),
      };
      (user as any).isManger = {
        status: MangerStatus,
      };
    }

    // for add StatusDevice

    return user;
  }

  async verfiedEmail(email: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('The Email Is Not Found');
    }

    const updatedUser = await this.userRepo.update(user.id, {
      verified: 1,
      email_verified_at: Date(),
      otp: null,
    });

    return {
      messgae: 'Otp successful! Please login',
    };
  }

  async deleteAacount(user: IJWTpayload) {
    const userexit = await this.findByIdVulnerable(user.userId);
    if (!userexit) {
      throw new NotFoundException('The User Not Founnd');
    }
    const update = await this.userRepo.update(user.userId, {
      deleted_at: Date(),
      email: `${user.email}1`,
    });

    return {
      message: 'The User Is Deleted',
    };
  }

  ///////////////////////////////////////FRO HELPER////////////////////////////////////////////////////////////////////////

  // to check if the email already exists in the database
  private async isEmailExists(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email } });
    return !!user;
  }
  // to get  the id if already exists in the database
  async findByIdVulnerable(id): Promise<IUser | null> {
    return await this.userRepo.findOne({ where: { id } });
  }
  // to create afflite code unique

  async createAffliteCode(): Promise<string> {
    let affliteCode: string;

    while (true) {
      affliteCode = generateRandomAlphanumeric(8);

      const checkFoundAffliteCode = await this.userRepo.findOneBy({
        affiliate_code: affliteCode,
      });

      if (!checkFoundAffliteCode) {
        break;
      }
    }

    return affliteCode;
  }
  // to check  commingAfflite exists in the datbase

  async checkCommingAfflite(
    incomingAffiliateCode: string | null,
  ): Promise<string> {
    if (!incomingAffiliateCode) {
      return (incomingAffiliateCode = 'ahmed');
    }

    const foundAfflite = await this.userRepo.findOne({
      where: { affiliate_code: incomingAffiliateCode },
    });

    if (!foundAfflite) {
      throw new NotFoundException('The selected comming afflite is invalid');
    }

    await this.userRepo.increment(
      { affiliate_code: incomingAffiliateCode },
      'number_of_user',
      1,
    );

    return incomingAffiliateCode;
  }

  // to Hash Password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  // change Password
  async changePassword(
    data: ChangePasswordDto,
    user: IJWTpayload,
  ): Promise<{ message: string }> {
    const checkEmail = await this.findOneByEmail(user.email);
    if (!checkEmail) {
      throw new ConflictException('The Email Is Not Found');
    }

    // check is verfied otp for chengPassword
    const checkVefiedOtp = await this.otpRepo.checkLastVerfied(
      checkEmail.id,
      TypeOtp.CHANGEPASSWORD,
    );
    if (!checkVefiedOtp) {
      throw new BadRequestException(
        'Invalid or expired OTP. Please enter a valid OTP or request a new one.',
      );
    }

    const checkOldPassword = await this.hashService.verifyText(
      data.oldPassword,
      checkEmail.password,
    );
    if (!checkOldPassword) {
      throw new ConflictException('Old password is incorrect');
    }

    const chengePassword = await this.userRepo.update(checkEmail.id, {
      password: await this.hashPassword(data.Password),
    });

    return {
      message: 'Operation updated successfully',
    };
  }

  async forgetPassword(data: ForgetPasswordDto) {
    const checkEmail = await this.findOneByEmail(data.email);
    if (!checkEmail) {
      throw new ConflictException('The Email Is Not Found');
    }
    // check is Manger Make Chnage
    const isManger = await this.deviceService.checkIsManger(
      data.ipDevice,
      data.deviceName,
      checkEmail.id,
    );
    if (!isManger) {
      throw new ForbiddenException(
        'Only the primary account holder is authorized to make this modification.',
      );
    }

    // check is verfied otp for chengPassword
    const checkVefiedOtp = await this.otpRepo.checkLastVerfied(
      checkEmail.id,
      TypeOtp.FORGETPASSWORD,
    );

    if (!checkVefiedOtp) {
      throw new BadRequestException('Please Insert FRist Otp or resend Code');
    }
    const chengePassword = await this.userRepo.update(checkEmail.id, {
      password: await this.hashPassword(data.password),
    });

    return {
      message: 'Operation updated successfully',
    };
  }

  async addMoney(userId, amount): Promise<Boolean> {
    const user = await this.findByIdVulnerable(userId);
    if (user) {
      await this.userRepo.update(user.id, {
        money: user.money + amount,
      });

      return true;
    }
    return false;
  }

  // change Email
  async changeEmail(
    data: ChangeEmailDto,
    user: IJWTpayload,
  ): Promise<{ message: string }> {
    const checkEmail = await this.findOneByEmail(data.email);
    if (checkEmail) {
      throw new ConflictException('The Email Is Aready Found');
    }

    // check is verfied otp for chengPassword
    const checkVefiedOtp = await this.otpRepo.checkLastVerfied(
      user.userId,
      TypeOtp.CHANGEEMAIL,
    );
    if (!checkVefiedOtp) {
      throw new BadRequestException(
        'Invalid or expired OTP. Please enter a valid OTP or request a new one.',
      );
    }

    const chengeEmail = await this.userRepo.update(user.userId, {
      email: data.email,
    });

    return {
      message: 'Operation updated successfully',
    };
  }
  async changeProfile(
    data: ChangeProfileDto,
    user: IJWTpayload,
    file,
  ): Promise<{ message: string }> {
    const checkEmail = await this.findOneByEmail(user.email);
    if (!checkEmail) {
      throw new ConflictException('The Email Is Not Found');
    }

    let updatedData = { ...data };
    // check if send img
    if (file) {
      const uploadedFile = await this.fileService.uploadFile(
        file,
        'profile_images',
      );

      updatedData.img = uploadedFile;
    }

    await this.userRepo.update(checkEmail.id, updatedData);

    return {
      message: 'Profile updated successfully',
    };
  }

  async checkmyMoneyWithUpdate(user: IJWTpayload, amount): Promise<Boolean> {
    const myUser = await this.findByIdVulnerable(user.userId);

    if (!myUser) {
      throw new ConflictException('The Email Is Not Found');
    }

    if (myUser.money >= amount) {
      await this.userRepo.update(
        { id: user.userId }, // Criteria to find the user
        { money: myUser.money - amount }, // Update the `money` field
      );
      return true;
    }

    return false;
  }

  async checkmyMoneyWithUpdateForBuy(
    user: IJWTpayload,
    amount: number,
    queryRunner,
  ): Promise<boolean> {
    const myUser = await this.findByIdVulnerable(user.userId);

    if (!myUser) {
      throw new ConflictException('The Email Is Not Found');
    }

    if (myUser.money >= amount) {
      const updateResult = await queryRunner.manager.update(
        'User',
        { id: user.userId },
        { money: myUser.money - amount },
      );

      if (updateResult.affected > 0) {
         return true;
      } else {
        throw new ConflictException('Failed to update user money');
      }
    }

    return false;
  }

  async getUserById(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    return user;
  }

  async getUserByAffiliate(commingAfflite: string) {
    const user = await this.userRepo.findOne({
      where: { affiliate_code: commingAfflite },
    });

    return user;
  }

  // for update mu money with out check with transaction

  async UpdateMoneyForBuy(
    user: IJWTpayload,
    amount,
    queryRunner,
  ): Promise<Boolean> {
    const myUser = await this.findByIdVulnerable(user.userId);

    if (!myUser) {
      throw new ConflictException('The Email Is Not Found');
    }

    if (myUser.money >= amount) {
      await queryRunner.manager.update(
        'User',
        { id: user.userId },
        { money: myUser.money - amount },
      );
      return true;
    }
  }

  async addMoneyReward(userId, amount, queryRunner): Promise<Boolean> {
    const user = await this.findByIdVulnerable(userId);
    if (user) {
      await queryRunner.manager.update(
        'User',   
        { id: user.id },   
        { number_points: user.number_points + amount }   
      );
      

      return true;
    }
    return false;
  }
}
