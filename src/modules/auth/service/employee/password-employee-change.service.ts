import { HttpException } from '@nestjs/common';
import HashPassword from '../../../../shared/utils/hash-password';
import { PrismaClient } from '@prisma/client';
import { PasswordChangeDto } from '../../dto/password-change.dto';

export default class EmployeePasswordChangeService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly email: string,
    private readonly body: PasswordChangeDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const employee = await this.prisma.user.findUnique({
        where: { email: this.email },
      });
      const comparePassword = await new HashPassword(
        this.body.currentPassword,
      ).compare(employee.password);

      if (!employee) {
        throw new HttpException('Agency not found', 404);
      }

      if (!comparePassword) {
        throw new HttpException('Invalid password', 400);
      } else {
        const cryptedPassword = await new HashPassword(
          this.body.newPassword,
        ).hash();
        await this.prisma.user.update({
          where: { email: this.email },
          data: { password: cryptedPassword },
        });
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}
