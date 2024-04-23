import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { CreateJobDto } from '../../dto/create-job.dto';

export class CreateJobService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly email: string,
    private readonly body: CreateJobDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.email },
      });
      if (!agency) {
        return new HttpException('Agency not found', 404);
      }
      const isAlreadyJob = await this.prisma.job.findFirst({
        where: { name: this.body.name, agency_id: agency.id },
      });
      console.log(isAlreadyJob);
      if (isAlreadyJob) {
        return new HttpException('Job already exists', 400);
      }
      await this.prisma.job.create({
        data: {
          name: this.body.name,
          color: this.body.color,
          agency_id: agency.id,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error creating job', 400);
    }
    return true;
  }
}
