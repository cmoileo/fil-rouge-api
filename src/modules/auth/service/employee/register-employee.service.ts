import { PrismaClient } from '@prisma/client';
import GenerateJwt from '../../../../shared/utils/jwt-token/generate-jwt';
import HashPassword from '../../../../shared/utils/hash-password';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RegisterEmployeeDto } from '../../dto/employee/register-employee.dto';

export default class RegisterEmployeeService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly body: RegisterEmployeeDto,
    private readonly id: string,
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
      const pendingEmployee = await this.prisma.pendingEmployee.findUnique({
        where: {
          id: this.id,
        },
      });
      if (!pendingEmployee || pendingEmployee.email !== this.body.email) {
        throw new HttpException('Employee not found', HttpStatus.BAD_REQUEST);
      }
      const agency_id = pendingEmployee.agency_id;
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
          agency_id: agency_id,
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
