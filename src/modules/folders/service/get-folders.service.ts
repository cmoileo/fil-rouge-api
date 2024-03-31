import { PrismaClient } from "@prisma/client";
import { HttpException } from "@nestjs/common";
import { FolderType } from "../../../shared/types/folder/folder.type";

export class GetFoldersService {
  async getFolders(
    prisma: PrismaClient,
    admin_email: string,
  ): Promise<FolderType[] | HttpException> {
    try {
      const agency = await prisma.agency.findFirst({
        where: {
          email: admin_email,
        },
      });
      if (!agency) {
        return new HttpException('Agency not found', 404)
      }
      const folders = await prisma.folder.findMany({
        where: {
          agency_id: agency.id,
        },
      });
      return folders;
    } catch (error) {
      throw new HttpException('Error getting folders', 500)
    }
  }
}