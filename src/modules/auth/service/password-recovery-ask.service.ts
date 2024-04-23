import { HttpException } from '@nestjs/common';
import { PasswordRecoveryAskDto } from '../dto/password-recovery-ask.dto';
import { PrismaClient } from '@prisma/client';
import MailerService from '../../../shared/utils/mail.service';
import HashPassword from '../../../shared/utils/hash-password';

export class PasswordRecoveryAskService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly body: PasswordRecoveryAskDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: this.body.email,
        },
      });

      if (!existingUser) {
        throw new HttpException('User not found', 404);
      }
      const pendingPassword = Math.random().toString(36).substring(2);
      const hashedPendingPassword = await new HashPassword(
        pendingPassword,
      ).hash();

      if (existingUser) {
        await this.prisma.user.update({
          where: {
            email: this.body.email,
          },
          data: {
            password: hashedPendingPassword,
          },
        });
      }

      await new MailerService(
        'Password recovery',
        `To recover your password, click on the following link ${process.env.API_URL}/password-recovery/${hashedPendingPassword}`,
        this.body.email,
      ).sendMail();

      return true;
    } catch (error) {
      throw new Error('Error while trying to recover password');
    }
  }
}
