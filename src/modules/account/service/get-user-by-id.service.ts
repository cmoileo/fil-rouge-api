import { PrismaClient, User } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import storageService from '../../../shared/utils/supabase/storage.service';

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
      if (user.profile_picture_url && user.profile_picture_key) {
        user.profile_picture_url = await storageService.getSignedUrl(
          user.profile_picture_url,
        );
      }
      return user;
    } catch (error) {
      return new HttpException('Internal server error', 500);
    }
  }
}
