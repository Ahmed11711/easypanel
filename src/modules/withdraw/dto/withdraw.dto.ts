import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class OrderWithdraw{

     @IsNotEmpty()
    amount:number

    @IsNotEmpty()
    @MinLength(25)
    publicAddress:string

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(6)
    pinCode:string
}