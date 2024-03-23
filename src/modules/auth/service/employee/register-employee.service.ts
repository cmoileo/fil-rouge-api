import { PrismaClient } from '@prisma/client';
import GenerateJwt from '../../../../shared/utils/jwt-token/generate-jwt';
import HashPassword from '../../../../shared/utils/hash-password';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RegisterEmployeeDto } from '../../dto/employee/register-employee.dto';

export default class RegisterEmployeeService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly body: RegisterEmployeeDto,
  ) {}

  async execute(): Promise<string | HttpException> {
    try {
      const isEmailRegistered = await this.prisma.user.findUnique({
        where: {
          email: this.body.email,
        },
      });
      if (isEmailRegistered) {
        throw new HttpException(
          'Email already registered',
          HttpStatus.BAD_REQUEST,
        );
      }
      const isPasswordMatch = this.body.password === this.body.passwordConfirm;
      if (!isPasswordMatch) {
        throw new HttpException(
          'Password and confirm password do not match',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await new HashPassword(this.body.password).hash();
      const newEmployee = await this.prisma.user.create({
        data: {
          firstname: this.body.firstname,
          lastname: this.body.lastname,
          email: this.body.email,
          password: hashedPassword,
          agency_id: this.body.agency_id,
        },
      });
      if (!newEmployee) {
        throw new HttpException(
          'Employee not created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const payload = { sub: this.body.email };
      const token = new GenerateJwt(payload, '30d').generate();
      return token;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
