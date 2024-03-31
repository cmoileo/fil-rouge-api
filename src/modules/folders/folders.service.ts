import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateFolderDto } from './dto/create-folder.dto';
import { CreateFolderService } from './service/create-folder.service';
import { DeleteFolderDto } from "./dto/delete-folder.dto";
import { DeleteFolderService } from "./service/delete-folder.service";

export class FoldersService {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }
  async createFolder(
    admin_email: string,
    body: CreateFolderDto,
  ): Promise<boolean | HttpException> {
    const newFolder = new CreateFolderService().execute(
      this.prisma,
      admin_email,
      body,
    );
    return newFolder;
  }

  async deleteFolder(
    admin_email: string,
    body: DeleteFolderDto,
  ): Promise<boolean | HttpException> {
    const deletedFolder = new DeleteFolderService().execute(
      this.prisma,
      admin_email,
      body,
    );
    return deletedFolder;
  }
}
