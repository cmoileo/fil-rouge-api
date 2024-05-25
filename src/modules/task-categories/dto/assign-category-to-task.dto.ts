import { IsString } from 'class-validator';

export class AssignCategoryToTaskDto {
  @IsString()
  task_id: string;

  @IsString()
  task_category_id: string;
}
