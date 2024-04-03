import { PrismaClient } from '@prisma/client';
import { CreateProjectDto } from '../dto/create-project.dto';
import { HttpException } from '@nestjs/common';

export default class CreateProjectService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly agency_email: string,
    private readonly body: CreateProjectDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const agency = await this.prisma.agency.findUnique({
        where: {
          email: this.agency_email,
        },
      });
      if (!agency) {
        return new HttpException('Agency not found', 404);
      }
      await this.prisma.project.create({
        data: {
          name: this.body.name,
          description: this.body.description,
          folder_id: this.body.folder_id,
        },
      });
      return true;
    } catch (error) {
      return new HttpException('Error creating project', 500);
    }
  }
}
