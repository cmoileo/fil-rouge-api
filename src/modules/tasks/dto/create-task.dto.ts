import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  description: string;

  @IsString()
  task_state_id: string;

  @IsArray()
  assigned_users_id: string[];

  @IsInt()
  starting_date: number;

  @IsInt()
  finishing_date: number;

  @IsInt()
  task_category_id: string;
}
