import { IsNotEmpty, IsNumber } from "class-validator";

export class ShareDto{

     @IsNotEmpty()
    idWallet:number

     @IsNotEmpty()
    numberUnit:number  
 

}