import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteFolderDto {
  @IsString()
  @IsNotEmpty()
  folder_id: string;
}
