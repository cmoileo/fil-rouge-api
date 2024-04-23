import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterEmployeeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsOptional()
  avatar: any;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
  })
  @IsNotEmpty()
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  passwordConfirm: string;
}
