import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateFolderDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString({})
  @IsOptional()
  @IsNotEmpty()
  parent_folder_id: string | null;
}
