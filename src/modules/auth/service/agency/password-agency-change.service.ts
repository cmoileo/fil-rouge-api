import { PrismaClient } from '@prisma/client';
import { PasswordChangeDto } from '../../dto/password-change.dto';
import { HttpException } from '@nestjs/common';
import HashPassword from '../../../../shared/utils/hash-password';

export class AgencyPasswordChangeService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly email: string,
    private readonly body: PasswordChangeDto,
  ) {}
  async execute(): Promise<boolean> {
    try {
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.email },
      });
      const comparePassword = await new HashPassword(
        this.body.currentPassword,
      ).compare(agency.password);

      if (!agency) {
        throw new HttpException('Agency not found', 404);
      }

      if (!comparePassword) {
        throw new HttpException('Invalid password', 400);
      } else {
        const cryptedPassword = await new HashPassword(
          this.body.newPassword,
        ).hash();
        await this.prisma.agency.update({
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
