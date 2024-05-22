import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskCategoryDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  color: string;
}
