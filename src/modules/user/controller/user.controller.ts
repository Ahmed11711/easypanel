import { Body, Controller, Post, Get, UseGuards, Delete,UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CheckOtpDto } from '../dto/otp.dto';
import { ISPublic } from 'src/modules/auth/decorator/isPublic.decorator';
import { ApiGlobalResponse } from 'src/common/decorator/swaigger.decorator';
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { ChangePasswordDto } from 'src/modules/user/dto/change-password-dto';
import { ManagerGuard } from 'src/modules/device-access/decorator/manger-device.decorator';
import { use } from 'passport';
import { ForgetPasswordDto } from 'src/modules/user/dto/forget-password-dtp';
import { ChangeEmailDto } from '../dto/change-email-dto';
import { ChangeProfileDto } from '../dto/change-profile-dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // Register a new user
  @ISPublic()
  @ApiGlobalResponse('Create user', [
    { status: 201, description: 'Success Register. Please Check Your Otp.' },
  ])
  @Post('create-user')
  registerUser(@Body() userdata: CreateUserDto) {
    return this.userService.create(userdata);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Get the current user's data
  @ApiGlobalResponse('Get My Data', [
    { status: 200, description: 'Success return my Data.' },
  ])
  // @UseGuards(ManagerGuard)

  @Post('me')
  async me(@GetCurrentUser() user: IJWTpayload) {
   
    return await this.userService.me(user.userId, user.MangerStatus);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Delete user account
  @ApiGlobalResponse('Delete Account', [
    { status: 200, description: 'The user account has been deleted.' },
  ])
  @UseGuards(ManagerGuard)
  @Delete('delete')
  async deleteAccount(@GetCurrentUser() user: IJWTpayload) {
    return this.userService.deleteAacount(user);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @UseGuards(ManagerGuard)
  @Post('change-password')
  async chnagePassword(
    @Body() data: ChangePasswordDto,
    @GetCurrentUser() user: IJWTpayload,
  ) {
    return await this.userService.changePassword(data, user);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @UseGuards(ManagerGuard)
  @Post('change-email')
  async chnageEmail(
    @Body() data: ChangeEmailDto,
    @GetCurrentUser() user: IJWTpayload,
  ) {
    return await this.userService.changeEmail(data, user);
  }
  @Post('change-profile')
  @UseInterceptors(FileInterceptor('img')) 
  async chnageProfil(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: ChangeProfileDto,
    @GetCurrentUser() user: IJWTpayload,
  ) {
       
    return await this.userService.changeProfile(data, user,file);
  }
  
  @ISPublic()
  @Post('forget-password')
  forgetPassword(@Body() data: ForgetPasswordDto) {
    return this.userService.forgetPassword(data);
  }
}
 