import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  project_id: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  task_state_id: string;

  @IsArray()
  @IsOptional()
  assigned_users_id: string[];

  @IsString()
  @IsOptional()
  starting_date: number;

  @IsString()
  @IsOptional()
  finishing_date: number;

  @IsString()
  @IsOptional()
  task_category_id: string;
}
