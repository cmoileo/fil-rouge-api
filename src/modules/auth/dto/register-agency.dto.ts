import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength
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
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
  })
  @IsNotEmpty()
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
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
  employee_count: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['freemium', 'pro', 'business'])
  plan: 'freemium' | 'pro' | 'business';
}
