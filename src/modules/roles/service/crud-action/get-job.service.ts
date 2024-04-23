import { PrismaClient } from '@prisma/client';
import { Job } from '../../../../shared/types/jobs/job.type';
import { HttpException } from '@nestjs/common';

export class GetJobService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly email: string,
  ) {}
  async execute(): Promise<Job[] | HttpException> {
    try {
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.email },
      });
      if (!agency) {
        return new HttpException('Agency not found', 404);
      }
      const jobs = await this.prisma.job.findMany({
        where: { agency_id: agency.id },
      });
      return jobs;
    } catch (error) {
      throw new HttpException('Error getting jobs', 500);
    }
  }
}
