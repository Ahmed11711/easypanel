import { Controller, Get ,Param,ParseIntPipe} from "@nestjs/common";
import { GetCurrentUser } from "src/modules/auth/decorator/get-current-user";
import { IJWTpayload } from "src/modules/auth/interface/login.payload";
import { ContractService } from "../service/contract.service";

@Controller('contract')

export class ContractController{

    constructor(
        private  readonly contractService:ContractService
    ){}


    @Get('my-contract')
    async myContract(@GetCurrentUser() user:IJWTpayload)
    {
        return this.contractService.getContractsWithBuyWallte(user.userId)
    }
    @Get('details/:id')
    async details(@Param('id', ParseIntPipe,) id: number,@GetCurrentUser() user:IJWTpayload ) {

        return this.contractService.getAllDetails(id,user.userId)
    }
    
    

}