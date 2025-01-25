import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { StatusWallte } from "../enum/statusWallte.enum";

export class UpdateInvestDto{

     @IsNotEmpty()
     walletId:number

 

    @IsNotEmpty()
    @IsEnum(StatusWallte)
    status:StatusWallte


}