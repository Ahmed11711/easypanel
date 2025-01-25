import { IsEnum, IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";
import { TypeWithdrawEnum } from "../enum/typeWithdraw.enum";

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

    @IsNotEmpty()
    @IsEnum(TypeWithdrawEnum)
    type:TypeWithdrawEnum
}