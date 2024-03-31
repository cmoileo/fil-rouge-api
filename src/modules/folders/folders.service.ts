import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FoldersService {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }
  async createFolder() {
    return 'create folder';
  }
}
