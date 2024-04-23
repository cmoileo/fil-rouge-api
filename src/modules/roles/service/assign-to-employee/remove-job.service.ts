import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { RemoveJobDto } from '../../dto/remove-job.dto';

export class RemoveJobService {
  constructor(
    private prisma: PrismaClient,
    private agencyEmail: string,
    private body: RemoveJobDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.agencyEmail },
      });
      if (!agency) {
        return new HttpException('Agency not found', 404);
      }
      const jobs_user = await this.prisma.jobsUsers.findFirst({
        where: { id: this.body.jobs_user_id, agencyId: agency.id },
      });
      console.log(this.body.jobs_user_id, agency.id);
      if (!jobs_user) {
        return new HttpException('Job not found', 404);
      }
      await this.prisma.jobsUsers.delete({
        where: { id: jobs_user.id },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error removing job', 400);
    }
  }
}
