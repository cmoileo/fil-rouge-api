import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddEmployeeAgencyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
