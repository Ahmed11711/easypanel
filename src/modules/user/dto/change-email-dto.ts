import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangeEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
