import { IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from '../../../shared/enum/role/role.enum';

export class AssignRoleDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  role: RoleEnum;
}
