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
      const user = await this.prisma.user.findUnique({
        where: { email: this.agencyEmail },
      });
      if (!user) {
        return new HttpException('Agency not found', 404);
      }
      const employee = await this.prisma.user.findUnique({
        where: {
          id: this.body.user_id,
          agency_id: user.agency_id,
        },
      });
      if (!employee) {
        return new HttpException('Employee not found', 404);
      }
      if (user.role == 'EMPLOYEE') {
        return new HttpException('User not allowed to assign jobs', 403);
      }
      await this.prisma.user.update({
        where: { id: employee.id },
        data: {
          job_id: this.body.job_id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error assigning job', 400);
    }
    return true;
  }
}
