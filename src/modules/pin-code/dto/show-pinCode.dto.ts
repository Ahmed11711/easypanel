import {
  IsString,
  IsNotEmpty,
  MinLength,
  maxLength,
  MaxLength,
} from 'class-validator';

export class ShowPinCodeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  pinCode: string;
}
