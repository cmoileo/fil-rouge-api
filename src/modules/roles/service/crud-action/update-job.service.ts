import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateJobDto } from '../../dto/update-job.dto';

export class UpdateJobService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly email: string,
    private readonly body: UpdateJobDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: this.email },
      });
      if (!user) {
        throw new HttpException('Agency not found', 404);
      }
      const job = await this.prisma.job.findFirst({
        where: { id: this.body.id, agency_id: user.agency_id },
      });
      if (!job) {
        throw new HttpException('Job not found', 404);
      }
      await this.prisma.job.update({
        where: { id: job.id },
        data: {
          name: this.body.name,
          color: this.body.color,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error updating job', 400);
    }
  }
}
