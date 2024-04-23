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
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.email },
      });
      if (!agency) {
        throw new HttpException('Agency not found', 404);
      }
      const job = await this.prisma.job.findFirst({
        where: { name: this.body.currentName, agency_id: agency.id },
      });
      if (!job) {
        throw new HttpException('Job not found', 404);
      }
      await this.prisma.job.update({
        where: { id: job.id },
        data: {
          name: this.body.newName,
          color: this.body.color,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error updating job', 400);
    }
  }
}
