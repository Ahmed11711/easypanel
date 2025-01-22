import { Body, Controller, Post, Request, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { userLoginDto } from '../dto/login.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ISPublic } from '../decorator/isPublic.decorator';
import { ApiGlobalResponse } from 'src/common/decorator/swaigger.decorator';
import { GetCurrentUser } from '../decorator/get-current-user';
import { IJWTpayload } from '../interface/login.payload';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @ApiGlobalResponse('Create user', [
    { status: 201, description: 'Success Login Please Check Your Cookies.' },
  ])
  @ISPublic()
  @Post('login')
  async login(@Body() userLoginDto: userLoginDto) {
    return await this.authservice.login(userLoginDto);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @ApiGlobalResponse('Logout user', [
    { status: 201, description: 'Success Logout .' },
  ])
  @Post('logout')
  async logout(@Request() req: Request) {}

  @ISPublic()
  @Post('refresh-token')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return await this.authservice.refreshToken(data.refreshToken);
  }
}
