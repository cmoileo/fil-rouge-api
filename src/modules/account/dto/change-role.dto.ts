import { RoleEnum } from '../../../shared/enum/role/role.enum';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeRoleDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
