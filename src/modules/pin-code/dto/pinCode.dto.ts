import {
  IsString,
  IsNotEmpty,
  MinLength,
  maxLength,
  MaxLength,
} from 'class-validator';

export class PinCodeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  pinCode: string;
}
