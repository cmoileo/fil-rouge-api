import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterAgencyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
