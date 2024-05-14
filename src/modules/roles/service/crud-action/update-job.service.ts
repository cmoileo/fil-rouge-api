import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateJobDto } from '../../dto/update-job.dto';

export class UpdateJobService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly email: string,
    private readonly body: UpdateJobDto,
    private readonly id: string,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: this.email },
      });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      const job = await this.prisma.job.findFirst({
        where: { id: this.id, agency_id: user.agency_id },
      });
      if (!job) {
        throw new HttpException('Job not found', 404);
      }
      if (job.agency_id !== user.agency_id) {
        throw new HttpException('Unauthorized', 401);
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
