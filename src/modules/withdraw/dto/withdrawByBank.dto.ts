import { IsEnum, IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";
import { TypeWithdrawEnum } from "../enum/typeWithdraw.enum";

export class WithdrawByBankDto{

     @IsNotEmpty()
    amount:number

    @IsNotEmpty()
    bankName:string

    @IsNotEmpty()
    bankAccountName:string


    @IsNotEmpty()
    ibanBank:string

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(6)
    pinCode:string

     @IsNotEmpty()
        @IsEnum(TypeWithdrawEnum)
        type:TypeWithdrawEnum
}