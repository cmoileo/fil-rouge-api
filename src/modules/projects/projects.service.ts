import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import CreateProjectService from './service/create-project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectService } from './service/update-project.service';
import { DeleteProjectService } from './service/delete-project.service';
import { GetProjectsService } from './service/get-projects.service';
import { Project } from '../../shared/types/project/project.type';
import { GetProjectByIdService } from "./service/get-project-by-id.service";

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

  async updateProject(
    agency_email: string,
    body: CreateProjectDto,
    project_id: string,
  ): Promise<boolean | HttpException> {
    const updatedProject = await new UpdateProjectService(
      this.prisma,
      agency_email,
      body,
      project_id,
    ).execute();
    return updatedProject;
  }
  async deleteProject(project_id: string): Promise<boolean | HttpException> {
    const deletedProject = await new DeleteProjectService(
      this.prisma,
      project_id,
    ).execute();
    return deletedProject;
  }

  async getProjects(): Promise<Project[]> {
    return await new GetProjectsService(this.prisma).execute();
  }

  async getProjectById(project_id: string): Promise<Project | HttpException> {
    return await new GetProjectByIdService(this.prisma, project_id).execute();
  }
}
