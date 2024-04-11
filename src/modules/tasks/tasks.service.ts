import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskService } from './service/create-task.service';
import { UpdateTaskService } from './service/update-task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteTaskService } from "./service/delete-task.service";
import { TaskType } from "../../shared/types/tasks/task.type";
import { GetTaskByIdService } from "./service/get-task-by-id.service";
import { GetAllTasksService } from "./service/get-all-tasks.service";

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
  async deleteTask(
    user_id: string,
    task_id: string,
  ): Promise<boolean | HttpException> {
    return new DeleteTaskService(this.prisma, user_id, task_id).execute();
  }
  async getTaskById(
    user_id: string,
    task_id: string,
  ): Promise<TaskType | HttpException> {
    return new GetTaskByIdService(this.prisma, user_id, task_id).execute();
  }

  async getAllTasks(user_email: string): Promise<TaskType[] | HttpException> {
    return new GetAllTasksService(this.prisma, user_email).execute();
  }
}
