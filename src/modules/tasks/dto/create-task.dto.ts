import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  task_state_id: string;

  @IsArray()
  @IsOptional()
  assigned_users_id: string[];

  @IsInt()
  @IsOptional()
  starting_date: number;

  @IsInt()
  @IsOptional()
  finishing_date: number;

  @IsInt()
  @IsOptional()
  task_category_id: string;
}
