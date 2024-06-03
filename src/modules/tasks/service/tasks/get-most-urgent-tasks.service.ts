import { PrismaClient, Task } from '@prisma/client';
import { HttpException } from '@nestjs/common';

export class GetMostUrgentTasksService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_email: string,
  ) {}

  async execute(): Promise<Task[] | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.user_email,
        },
      });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      const agency = await this.prisma.agency.findUnique({
        where: {
          id: user.agency_id,
        },
      });
      if (!agency) {
        throw new HttpException('Agency not found', 404);
      }
      const tasks = await this.prisma.task.findMany({
        where: {
          agencyId: user.agency_id,
        },
        orderBy: {
          finishing_date: 'asc',
        },
      });
      return tasks;
    } catch (error) {
      console.log(error);
      return new HttpException('Internal server error', 500);
    }
  }
}
