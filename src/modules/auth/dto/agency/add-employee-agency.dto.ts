import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleEnum } from '../../../../shared/enum/role/role.enum';

export class AddEmployeeAgencyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: RoleEnum;
}
