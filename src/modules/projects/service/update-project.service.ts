import { PrismaClient } from '@prisma/client';
import { CreateProjectDto } from '../dto/create-project.dto';
import { HttpException } from '@nestjs/common';

export class UpdateProjectService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly agency_email: string,
    private readonly body: CreateProjectDto,
    private readonly project_id: string,
  ) {}

  async execute() {
    try {
      const agency = await this.prisma.agency.findUnique({
        where: {
          email: this.agency_email,
        },
      });
      if (!agency) {
        throw new HttpException('Agency not found', 404);
      }
      await this.prisma.project.update({
        where: {
          id: this.project_id,
        },
        data: {
          name: this.body.name,
          description: this.body.description,
          folder_id: this.body.folder_id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error updating project', 500);
    }
  }
}
