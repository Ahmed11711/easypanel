import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class WithdrawBank{

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
}