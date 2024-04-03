import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import CreateProjectService from './service/create-project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }

  async createProject(
    agency_email: string,
    body: CreateProjectDto,
  ): Promise<boolean | HttpException> {
    const createdProject = await new CreateProjectService(
      this.prisma,
      agency_email,
      body,
    ).execute();
    return createdProject;
  }
}
