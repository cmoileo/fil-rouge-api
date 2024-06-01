import {
  IsString,
  IsOptional,
  IsInt,
  IsDate,
  IsEnum,
  IsArray,
} from 'class-validator';

enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  starting_date?: Date;

  @IsOptional()
  finishing_date?: Date;

  @IsInt()
  @IsOptional()
  progress_percentage?: number;

  @IsEnum(Priority)
  @IsOptional()
  is_priority?: Priority;

  @IsString()
  @IsOptional()
  project_id?: string;

  @IsInt()
  @IsOptional()
  kanban_state_id?: number;

  @IsInt()
  @IsOptional()
  agencyId?: number;

  @IsInt()
  @IsOptional()
  userId?: number;

  @IsString()
  @IsOptional()
  task_state_id?: string;

  @IsArray()
  @IsOptional()
  assigned_users_id?: string[];
}
