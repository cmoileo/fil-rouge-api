import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateFolderDto } from './dto/create-folder.dto';
import { CreateFolderService } from './service/create-folder.service';

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
}
