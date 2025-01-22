import { IsNotEmpty, IsNumber } from "class-validator";

export class InvestDto{

     @IsNotEmpty()
    idWallet:number

    //  @IsNotEmpty()
    // numberUnit:number  

    @IsNotEmpty()
    amount:number


}