import { PrismaClient } from '@prisma/client';
import { CreateProjectDto } from '../dto/create-project.dto';
import { HttpException } from '@nestjs/common';

export default class CreateProjectService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_email: string,
    private readonly body: CreateProjectDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.user_email,
        },
      });
      if (!user) {
        return new HttpException('Agency not found', 404);
      }
      if (user.role !== 'OWNER' && 'ADMIN') {
        return new HttpException('Unauthorized', 401);
      }
      const existingProject = await this.prisma.project.findFirst({
        where: {
          name: this.body.name,
          folder_id: this.body.folder_id,
        },
      });
      if (existingProject) {
        return new HttpException('Project already exists', 400);
      }
      await this.prisma.project.create({
        data: {
          name: this.body.name,
          description: this.body.description,
          folder_id: this.body.folder_id,
          agency_id: user.agency_id,
        },
      });
      return true;
    } catch (error) {
      return new HttpException('Error creating project', 500);
    }
  }
}
