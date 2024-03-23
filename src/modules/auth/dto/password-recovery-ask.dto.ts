import { IsEmail, IsNotEmpty } from 'class-validator';

export class PasswordRecoveryAskDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
