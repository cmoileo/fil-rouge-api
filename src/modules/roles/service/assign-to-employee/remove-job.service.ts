import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { RemoveJobDto } from '../../dto/remove-job.dto';

export class RemoveJobService {
  // constructor(
  //   private prisma: PrismaClient,
  //   private agencyEmail: string,
  //   private body: RemoveJobDto,
  // ) {}
  //
  // async execute(): Promise<boolean | HttpException> {
  //   try {
  //     const user = await this.prisma.user.findUnique({
  //       where: { email: this.agencyEmail },
  //     });
  //     if (!user) {
  //       return new HttpException('User not found', 404);
  //     }
  //     const jobs_user = await this.prisma.jobsUsers.findFirst({
  //       where: {
  //         job_id: this.body.job_id,
  //         user_id: this.body.user_id,
  //         agencyId: user.agency_id,
  //       },
  //     });
  //     if (!jobs_user) {
  //       return new HttpException('Job not found', 404);
  //     }
  //     await this.prisma.jobsUsers.delete({
  //       where: { id: jobs_user.id },
  //     });
  //     return true;
  //   } catch (error) {
  //     throw new HttpException('Error removing job', 400);
  //   }
  // }
}
