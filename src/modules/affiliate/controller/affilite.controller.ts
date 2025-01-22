import { Controller,Get } from "@nestjs/common";
import { AffiliateService } from '../service/Affiliate.service';
import { GetCurrentUser } from 'src/modules/auth/decorator/get-current-user';
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';
import { ISPublic } from "src/modules/auth/decorator/isPublic.decorator";
@Controller('affiliate')

export class AffiliateController{

    constructor(
        private readonly affiliateService:AffiliateService
    ){}


    @Get()
    getMyAffiliate(@GetCurrentUser() user:IJWTpayload)
    {
        
        return this.affiliateService.getResponse(user.userId)
    }

    @ISPublic()
    @Get('reward')
    getAllReward()
    {
        return this.affiliateService.getAllReward()
    }



}