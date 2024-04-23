import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAccountDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsOptional()
  avatar: any;
}
