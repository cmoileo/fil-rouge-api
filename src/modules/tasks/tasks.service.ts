import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskService } from './service/create-task.service';
import { UpdateTaskService } from './service/update-task.service';
import { UpdateTaskDto } from './dto/update-task.dto';

export class TasksService {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }

  async createTask(
    user_id: string,
    body: CreateTaskDto,
  ): Promise<boolean | HttpException> {
    return new CreateTaskService(this.prisma, user_id, body).createTask();
  }

  async updateTask(
    user_id: string,
    task_id: string,
    body: UpdateTaskDto,
  ): Promise<boolean | HttpException> {
    return new UpdateTaskService(this.prisma, user_id, task_id, body).execute();
  }
}
