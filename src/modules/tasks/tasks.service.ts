import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from './dto/tasks/create-task.dto';
import { CreateTaskService } from './service/tasks/create-task.service';
import { UpdateTaskService } from './service/tasks/update-task.service';
import { UpdateTaskDto } from './dto/tasks/update-task.dto';
import { DeleteTaskService } from './service/tasks/delete-task.service';
import { TaskType } from '../../shared/types/tasks/task.type';
import { GetTaskByIdService } from './service/tasks/get-task-by-id.service';
import { GetAllTasksService } from './service/tasks/get-all-tasks.service';
import { AddCommentService } from "./service/comments/add-comment.service";
import { CreateCommentDto } from "./dto/comments/create-comment.dto";

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
  async addCommentToTask(
    user_id: string,
    task_id: string,
    body: CreateCommentDto,
  ): Promise<boolean | HttpException> {
    return new AddCommentService(this.prisma, user_id, task_id, body).execute();
  }
}
