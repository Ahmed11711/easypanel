import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateUserKycDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  international_id: string;
}
