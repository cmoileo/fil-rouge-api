import { UpdateAccountDto } from '../dto/update-account.dto';
import { AccountType } from '../../../shared/types/account/account.type';
import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import storageService from '../../../shared/utils/supabase/storage.service';
import { extname } from 'path';

export class UpdateAccountService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_email: string,
    private readonly body: UpdateAccountDto,
  ) {}
  async execute(): Promise<AccountType | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.user_email,
        },
      });
      if (!user) {
        return new HttpException('User not found', 404);
      }
      let imageUrl: { name: string; image_url: string } | null;
      const image_key = `${Date.now()}${extname(this.body.avatar.originalname)}`;
      if (image_key !== user.profile_picture_key) {
        imageUrl = await storageService.uploadFile(this.body.avatar);
      }
      const updatedUser: AccountType = await this.prisma.user.update({
        where: {
          email: this.user_email,
        },
        data: {
          email: this.body.email,
          firstname: this.body.firstname,
          lastname: this.body.lastname,
          profile_picture_url: imageUrl
            ? imageUrl.image_url
            : user.profile_picture_url,
          profile_picture_key: imageUrl ? image_key : user.profile_picture_key,
        },
      });
      if (!updatedUser) return new HttpException('User not found', 404);
      if (updatedUser.profile_picture_url && updatedUser.profile_picture_key) {
        updatedUser.profile_picture_url = await storageService.getSignedUrl(
          updatedUser.profile_picture_url,
        );
      }
      return updatedUser;
    } catch (error) {
      return new HttpException(error.message, error.status);
    }
  }
}
