import { CreateFolderDto } from '../dto/create-folder.dto';
import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';

export class CreateFolderService {
  async execute(
    prisma: PrismaClient,
    admin_email: string,
    body: CreateFolderDto,
  ): Promise<boolean | HttpException> {
    try {
      const agency = await prisma.agency.findFirst({
        where: {
          email: admin_email,
        },
      });
      if (!agency) {
        return new HttpException('Agency not found', 404);
      }
      const existingFolder = await prisma.folder.findFirst({
        where: {
          name: body.name,
          agency_id: agency.id,
          parent_folder_id: body.parent_folder_id,
        },
      });
      console.log('existingFolder', existingFolder);
      if (existingFolder) {
        return new HttpException('Folder already exists', 400);
      }
      await prisma.folder.create({
        data: {
          name: body.name,
          parent_folder_id: body.parent_folder_id,
          agency_id: agency.id,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error creating folder', 500);
    }
  }
}
