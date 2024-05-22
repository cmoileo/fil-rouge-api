import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  color: string;
}
