import { PrismaClient } from '@prisma/client';
import { LoginEmployeeDto } from '../../dto/employee/login-employee.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import HashPassword from '../../../../shared/utils/hash-password';
import GenerateJwt from '../../../../shared/utils/jwt-token/generate-jwt';

export default class LoginEmployeeService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly body: LoginEmployeeDto,
  ) {}
  async execute(): Promise<{ token: string; role: string } | HttpException> {
    try {
      const employee = await this.prisma.user.findUnique({
        where: {
          email: this.body.email,
        },
      });
      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }
      const passwordMatch = await new HashPassword(this.body.password).compare(
        employee.password,
      );

      if (!passwordMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const payload = { sub: employee.email };
      const token = await new GenerateJwt(payload, '30d').generate();
      return {
        token: token,
        role: employee.role,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
