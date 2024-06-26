import { PrismaClient } from '@prisma/client';
import { UpdateFolderDto } from '../dto/update-folder.dto';
import { HttpException } from '@nestjs/common';
import { verifyParentId } from '../utils/verify-parend-id.util';

export class UpdateFolderService {
  async execute(
    prisma: PrismaClient,
    user_email: string,
    body: UpdateFolderDto,
  ): Promise<boolean | HttpException> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: user_email,
        },
      });
      if (!user) {
        return new HttpException('Agency not found', 404);
      }
      const folder = await prisma.folder.findFirst({
        where: {
          id: body.id,
          agency_id: user.agency_id,
        },
      });
      if (!folder) {
        return new HttpException('Folder not found', 404);
      }
      const canUpdate = await verifyParentId(
        prisma,
        folder,
        body.parent_folder_id,
        body.parent_folder_id,
      );
      if (canUpdate) {
        await prisma.folder.update({
          where: {
            id: body.id,
          },
          data: {
            name: body.name,
            parent_folder_id:
              body.parent_folder_id === folder.id
                ? null
                : body.parent_folder_id,
          },
        });
        return true;
      } else {
        return new HttpException('Invalid parent folder', 400);
      }
    } catch (error) {
      return new HttpException('Error updating folder', 500);
    }
  }
}
