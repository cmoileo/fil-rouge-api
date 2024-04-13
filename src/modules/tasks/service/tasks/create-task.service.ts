import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from '../../dto/tasks/create-task.dto';
import { HttpException } from '@nestjs/common';

export class CreateTaskService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_id: string,
    private body: CreateTaskDto,
  ) {}

  async createTask(): Promise<boolean | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.user_id,
        },
      });
      if (!user) {
        return new HttpException('User not found', 404);
      }
      const agency = await this.prisma.agency.findUnique({
        where: {
          id: user.agency_id,
        },
      });
      if (!agency) {
        return new HttpException('Agency not found', 404);
      }
      const createdTask = await this.prisma.task.create({
        data: {
          name: this.body.name,
          userId: user.id,
          agencyId: agency.id,
        },
      });
      if (this.body.assigned_users_id) {
        for (const assigned_user_id of this.body.assigned_users_id) {
          await this.prisma.assignedTask.create({
            data: {
              employe_id: assigned_user_id,
              task_id: createdTask.id,
            },
          });
        }
      }
      return true;
    } catch (error) {
      console.log(error);
      return new HttpException('Internal Server Error', 500);
    }
  }
}
