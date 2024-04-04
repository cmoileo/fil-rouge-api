import { PrismaClient } from '@prisma/client';
import { Project } from '../../../shared/types/project/project.type';
import { HttpException } from '@nestjs/common';

export class GetProjectsService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(): Promise<Project[]> {
    try {
      const projects: Project[] = await this.prisma.project.findMany();
      return projects;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
