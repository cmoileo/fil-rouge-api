import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { AssignJobDto } from '../../dto/assign-job.dto';

export class AssignJobJob {
  constructor(
    private prisma: PrismaClient,
    private agencyEmail: string,
    private body: AssignJobDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.agencyEmail },
      });
      if (!agency) {
        return new HttpException('Agency not found', 404);
      }
      const employee = await this.prisma.user.findUnique({
        where: {
          id: this.body.user_id,
          agency_id: agency.id,
        },
      });
      if (!employee) {
        return new HttpException('Employee not found', 404);
      }
      const existingJob = await this.prisma.jobsUsers.findFirst({
        where: {
          job_id: this.body.job_id,
          user_id: this.body.user_id,
          agencyId: agency.id,
        },
      });
      if (existingJob) {
        return new HttpException('Job already assigned', 400);
      }
      await this.prisma.jobs.Users.create({
        data: {
          job_id: this.body.job_id,
          user_id: this.body.user_id,
          agencyId: agency.id,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error assigning job', 400);
    }
    return true;
  }
}
