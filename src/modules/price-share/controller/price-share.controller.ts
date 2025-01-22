import { Controller,Get } from "@nestjs/common";
import { PriceShareService } from "../service/price-share.service";
import { ISPublic } from "src/modules/auth/decorator/isPublic.decorator";
 
@Controller('chart-share')

export class PriceShareController{

    constructor(
        private readonly priceShareService:PriceShareService,
    ){}

  
     @ISPublic()
    @Get()
    getAll(){
        return this.priceShareService.getAll();
    }
}