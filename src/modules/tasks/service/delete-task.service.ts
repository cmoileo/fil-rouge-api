import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';

export class DeleteTaskService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_id: string,
    private readonly task_id: string,
  ) {}
  async execute(): Promise<boolean | HttpException> {
    try {
      const existsTask = await this.prisma.task.findFirst({
        where: {
          id: this.task_id,
        },
      });
      if (!existsTask) {
        throw new HttpException('Task not found', 404);
      }
      const user = await this.prisma.user.findFirst({
        where: {
          email: this.user_id,
        },
      });
      if (existsTask.agencyId !== user.agency_id) {
        throw new HttpException('Unauthorized', 401);
      }
      await this.prisma.task.delete({
        where: {
          id: this.task_id,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }
}
