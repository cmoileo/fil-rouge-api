import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { FolderType } from '../../../shared/types/folder/folder.type';

export class GetFoldersService {
  async getFolders(
    prisma: PrismaClient,
    user_email: string,
  ): Promise<FolderType[] | HttpException> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: user_email,
        },
      });
      if (!user) {
        return new HttpException('User not found', 404);
      }
      const folders = await prisma.folder.findMany({
        where: {
          agency_id: user.agency_id,
        },
      });
      return folders;
    } catch (error) {
      throw new HttpException('Error getting folders', 500);
    }
  }
}
