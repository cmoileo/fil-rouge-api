import { PrismaClient } from '@prisma/client';
import { Project } from '../../../shared/types/project/project.type';
import { HttpException } from '@nestjs/common';

export class GetProjectsService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly userEmail: string,
  ) {}

  async execute(): Promise<Project[]> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: this.userEmail,
      },
    });
    if (!user) {
      throw new HttpException('Agency not found', 404);
    }
    try {
      const projects: Project[] = await this.prisma.project.findMany({
        where: {
          agency_id: user.agency_id,
        },
        include: {
          tasks: true,
        },
      });
      return projects;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
