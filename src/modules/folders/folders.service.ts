import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateFolderDto } from './dto/create-folder.dto';
import { CreateFolderService } from './service/create-folder.service';
import { DeleteFolderDto } from './dto/delete-folder.dto';
import { DeleteFolderService } from './service/delete-folder.service';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { UpdateFolderService } from './service/update-folder.service';
import { GetFoldersService } from "./service/get-folders.service";

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
  async updateFolder(
    admin_email: string,
    body: UpdateFolderDto,
  ): Promise<boolean | HttpException> {
    const updatedFolder = new UpdateFolderService().execute(
      this.prisma,
      admin_email,
      body,
    );
    return updatedFolder;
  }

  async getFolders(admin_email: string) {
    const folders = await new GetFoldersService().getFolders(this.prisma, admin_email);
    return folders;
  }
}
