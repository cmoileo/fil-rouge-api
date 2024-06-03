import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { TaskType } from '../../../../shared/types/tasks/task.type';

export class GetTaskByIdService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_id: string,
    private readonly task_id: string,
  ) {}

  async execute(): Promise<TaskType | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.user_id,
        },
        select: {
          agency_id: true,
        },
      });
      const task: TaskType = await this.prisma.task.findFirst({
        where: {
          id: this.task_id,
          agencyId: user.agency_id,
        },
        include: {
          task_users: true,
          comments: true,
        },
      });
      if (!task) {
        throw new HttpException('Task not found', 404);
      }
      return task;
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal server error', 500);
    }
  }
}
