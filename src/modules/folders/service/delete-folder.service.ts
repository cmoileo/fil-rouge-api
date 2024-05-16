import { PrismaClient } from '@prisma/client';
import { HttpException, Injectable } from '@nestjs/common';
import { updateChildFolders } from '../utils/update-child-folder.util';
import { FolderType } from '../../../shared/types/folder/folder.type';

@Injectable()
export class DeleteFolderService {
  async execute(
    prisma: PrismaClient,
    user_email: string,
    folderId: string,
  ): Promise<boolean | HttpException> {
    try {
      const folder: FolderType = await prisma.folder.findUnique({
        where: {
          id: folderId,
        },
      });

      if (!folder) {
        throw new HttpException('Folder not found', 404);
      }

      const agency = await prisma.agency.findUnique({
        where: {
          id: folder.agency_id,
        },
      });
      const user = await prisma.user.findFirst({
        where: {
          email: user_email,
        },
      });
      if (
        agency.id !== user.agency_id ||
        (user.role !== 'OWNER' && user.role !== 'ADMIN')
      ) {
        throw new HttpException('Unauthorized', 403);
      }

      await updateChildFolders(prisma, folder, folder.parent_folder_id);

      await prisma.folder.delete({
        where: {
          id: folder.id,
        },
      });

      // await prisma.folder.delete({
      //   where: {
      //     id: folder.id,
      //   },
      // });

      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', 500);
    }
  }
}
