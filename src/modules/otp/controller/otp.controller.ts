import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from '../service/otp.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RestOtpDto } from '../dto/rest-otp.dto';
import { CheckOtpDto } from '../dto/check-otp.dto';
import { ISPublic } from 'src/modules/auth/decorator/isPublic.decorator';
import { Throttle } from '@nestjs/throttler';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';
@Controller('otp')
@ApiTags('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ApiOperation({ summary: 'Verify OTP for a user' })
  @ApiBody({
    description: 'Data required to check the OTP',
    type: CheckOtpDto,
  })
  @ApiResponse({ status: 201, description: 'OTP verified successfully' })
  @ApiResponse({
    status: 404,
    description: 'The email is not found or the OTP is invalid/expired',
  })
  @ISPublic()
  @Post('check-otp')
  checkOtp(@Body() otpData: CheckOtpDto) {
    return this.otpService.checkOtp(otpData);
  }
  @ISPublic()
  @ApiOperation({ summary: 'Resend OTP' })
  @ApiBody({ type: RestOtpDto })
  @ApiResponse({
    status: 200,
    description: 'OTP resent successfully.',
    type: RestOtpDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Post('send-otp')
  resendotp(@Body() data: RestOtpDto) {
    return this.otpService.resndOtp(data);
  }

  @Post('send-otp-changeEmail')
  resendotpChangeEmail(
    @Body() data: RestOtpDto,
    @GetCurrentUser() user: IJWTpayload,
  ) {
    return this.otpService.resndOtpForChangePassword(data, user);
  }
}
