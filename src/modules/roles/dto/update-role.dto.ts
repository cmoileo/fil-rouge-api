import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  currentName: string;

  @IsString()
  @IsNotEmpty()
  newName: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}
