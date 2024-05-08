import { CreateFolderDto } from '../dto/create-folder.dto';
import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { FolderType } from '../../../shared/types/folder/folder.type';

export class CreateFolderService {
  async execute(
    prisma: PrismaClient,
    admin_email: string,
    body: CreateFolderDto,
  ): Promise<FolderType | HttpException> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: admin_email,
        },
      });
      if (!user) {
        return new HttpException('Agency not found', 404);
      }
      if (user.role !== 'OWNER' && user.role !== 'ADMIN') {
        return new HttpException('Unauthorized', 401);
      }
      const existingFolder = await prisma.folder.findFirst({
        where: {
          name: body.name,
          agency_id: user.agency_id,
          parent_folder_id: body.parent_folder_id,
        },
      });
      if (existingFolder) {
        return new HttpException('Folder already exists', 400);
      }
      const folder = await prisma.folder.create({
        data: {
          name: body.name,
          parent_folder_id: body.parent_folder_id,
          agency_id: user.agency_id,
        },
      });
      return folder;
    } catch (error) {
      throw new HttpException('Error creating folder', 500);
    }
  }
}
