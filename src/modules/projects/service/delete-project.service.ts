import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';

export class DeleteProjectService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly project_id: string,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const project = await this.prisma.project.findUnique({
        where: {
          id: this.project_id,
        },
      });
      if (!project) {
        throw new HttpException('Project not found', 404);
      }
      await this.prisma.project.delete({
        where: {
          id: this.project_id,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error deleting project', 500);
    }
  }
}
