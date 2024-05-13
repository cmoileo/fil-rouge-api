import { HttpException } from '@nestjs/common';
import { AccountType } from '../../../shared/types/account/account.type';
import { PrismaClient } from '@prisma/client';
import storageService from '../../../shared/utils/supabase/storage.service';

export class GetUsersService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly email: string,
  ) {}
  async execute(): Promise<AccountType[] | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.email,
        },
      });
      if (!user) {
        return new HttpException('User not found', 404);
      }
      const users = await this.prisma.user.findMany({
        where: {
          agency_id: user.agency_id,
        },
      });

      for (const user1 of users) {
        if (user1.profile_picture_url && user1.profile_picture_url) {
          user1.profile_picture_url = await storageService.getSignedUrl(
            user1.profile_picture_url,
          );
        }
      }

      return users;
    } catch (error) {
      return new HttpException('Internal server error', 500);
    }
  }
}
