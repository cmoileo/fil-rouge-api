import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { RoleEnum } from '../../../../shared/enum/role/role.enum';

export class AddEmployeeAgencyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  role: RoleEnum;
}
