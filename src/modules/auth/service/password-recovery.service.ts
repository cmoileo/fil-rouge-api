import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PasswordRecoveryDto } from '../dto/password-recovery.dto';
import HashPassword from '../../../shared/utils/hash-password';

export class PasswordRecoveryService {
  constructor(
    private readonly id: string,
    private readonly prisma: PrismaClient,
    private readonly body: PasswordRecoveryDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: this.body.email },
      });
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.body.email },
      });
      if (!user && !agency) {
        throw new HttpException('User not found', 404);
      }
      if (
        (user && user.password !== this.id) ||
        (agency && agency.password !== this.id)
      ) {
        throw new HttpException('Invalid token', 400);
      }
      if (this.body.password !== this.body.passwordConfirm) {
        throw new HttpException('Passwords do not match', 400);
      }
      const hashedNewPassword = await new HashPassword(
        this.body.password,
      ).hash();
      if (user) {
        await this.prisma.user.update({
          where: { email: this.body.email },
          data: { password: hashedNewPassword },
        });
      } else {
        await this.prisma.agency.update({
          where: { email: this.body.email },
          data: { password: hashedNewPassword },
        });
      }
      return true;
    } catch (error) {
      throw new HttpException('Error on password recovery', 500);
    }
  }
}
