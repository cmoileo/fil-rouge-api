import { PrismaClient } from '@prisma/client';
import { Project } from '../../../shared/types/project/project.type';
import { HttpException } from '@nestjs/common';

export class GetProjectByIdService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly project_id: string,
  ) {}
  async execute(): Promise<Project | HttpException> {
    try {
      const project: Project = await this.prisma.project.findUnique({
        where: {
          id: this.project_id,
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
