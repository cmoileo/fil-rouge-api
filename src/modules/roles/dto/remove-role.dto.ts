import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveRoleDto {
  @IsString()
  @IsNotEmpty()
  roles_user_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
