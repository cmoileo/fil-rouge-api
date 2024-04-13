import { PrismaClient } from '@prisma/client';
import { TaskType } from '../../../../shared/types/tasks/task.type';
import { HttpException } from '@nestjs/common';

export class GetAllTasksService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_email: string,
  ) {}
  async execute(): Promise<TaskType[] | HttpException> {
    try {
      const user_angency = await this.prisma.user.findUnique({
        where: {
          email: this.user_email,
        },
        select: {
          agency_id: true,
        },
      });
      if (!user_angency) {
        throw new HttpException('User not found', 404);
      }
      const tasks: TaskType[] = await this.prisma.task.findMany({
        where: {
          agencyId: user_angency.agency_id,
        },
      });
      return tasks;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }
}
