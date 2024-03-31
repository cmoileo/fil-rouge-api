import { PrismaClient } from '@prisma/client';
import { DeleteFolderDto } from '../dto/delete-folder.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { updateChildFolders } from './update-child-folder';
import { FolderType } from "../../../shared/types/folder/folder.type";

@Injectable()
export class DeleteFolderService {
  async execute(
    prisma: PrismaClient,
    agency_email: string,
    body: DeleteFolderDto,
  ): Promise<boolean | HttpException> {
    try {
      const folder: FolderType = await prisma.folder.findUnique({
        where: {
          id: body.folder_id,
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

      if (agency.email !== agency_email) {
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
      throw new HttpException('Error', 500);
    }
  }
}
