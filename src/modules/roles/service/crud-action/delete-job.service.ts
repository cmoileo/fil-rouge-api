import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class DeleteJobService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jobId: string,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const job = await this.prisma.job.findUnique({
        where: { id: this.jobId },
      });
      if (!job) {
        return new HttpException('Job not found', 404);
      }
      await this.prisma.job.delete({
        where: { id: this.jobId },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error deleting job', 400);
    }
  }
}
