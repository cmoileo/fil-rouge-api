import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString({})
  @IsOptional()
  @IsNotEmpty()
  parent_folder_id: string | null;
}
