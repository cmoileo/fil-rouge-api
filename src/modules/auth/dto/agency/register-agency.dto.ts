import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAgencyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

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

  @IsInt()
  @IsNotEmpty()
  house_number: number;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsInt()
  @IsNotEmpty()
  zip_code: number;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  employee_count: number;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  avatar: any;
}
