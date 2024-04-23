import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveJobDto {
  @IsString()
  @IsNotEmpty()
  jobs_user_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
