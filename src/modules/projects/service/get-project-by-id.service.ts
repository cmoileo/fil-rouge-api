import { PrismaClient, Project } from '@prisma/client';
import { HttpException } from '@nestjs/common';

export class GetProjectByIdService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly project_id: string,
  ) {}
  async execute(): Promise<Project | HttpException> {
    try {
      const project = await this.prisma.project.findUnique({
        where: {
          id: this.project_id,
        },
        include: {
          tasks: true,
        },
      });
      if (!project) {
        throw new HttpException('Project not found', 404);
      }
      return project;
    } catch (error) {
      throw new HttpException('Error while fetching project', 500);
    }
  }
}
