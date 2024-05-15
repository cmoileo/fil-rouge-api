import { PrismaClient, User } from '@prisma/client';
import { HttpException } from '@nestjs/common';

export class GetUserByIdService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly email: string,
  ) {}
  async execute(): Promise<User | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.email,
        },
      });
      if (!user) {
        return new HttpException('User not found', 404);
      }
      return user;
    } catch (error) {
      return new HttpException('Internal server error', 500);
    }
  }
}
