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
      const user = await this.prisma.user.findUnique({
        where: { email: this.email },
      });
      if (!user) {
        return new HttpException('Agency not found', 404);
      }
      const jobs = await this.prisma.job.findMany({
        where: { agency_id: user.agency_id },
      });
      return jobs;
    } catch (error) {
      throw new HttpException('Error getting jobs', 500);
    }
  }
}
