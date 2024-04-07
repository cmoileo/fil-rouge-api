import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from '../dto/create-task.dto';
import { HttpException } from '@nestjs/common';

export class CreateTaskService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly agency_id: string,
    private body: CreateTaskDto,
  ) {}

  async createTask(): Promise<boolean | HttpException> {
    try {
      if (!this.agency_id) {
        return new HttpException('Agency not found', 404);
      }
      await this.prisma.task.create({
        data: {
          name: this.body.name,
          userId: this.body.user_id,
          agencyId: this.agency_id,
        },
      });
      if (this.body.assigned_users_id) {
        for (const assigned_user_id of this.body.assigned_users_id) {
          await this.prisma.assignedTask.create({
            data: {
              employe_id: assigned_user_id,
              task_id: this.body.user_id,
            },
          });
        }
      }
      return true;
    } catch (error) {
      return new HttpException('Internal Server Error', 500);
    }
  }
}
