import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAgencyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
