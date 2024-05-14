import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveJobDto {
  @IsString()
  @IsNotEmpty()
  job_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
