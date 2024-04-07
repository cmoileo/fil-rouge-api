import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskService } from './service/create-task.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }

  async createTask(
    agency_id: string,
    body: CreateTaskDto,
  ): Promise<boolean | HttpException> {
    return new CreateTaskService(this.prisma, agency_id, body).createTask();
  }
}
