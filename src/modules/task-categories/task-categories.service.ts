import { CreateTaskCategoryService } from './service/create-task-category.service';
import { PrismaClient } from '@prisma/client';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { GetTaskCategoriesService } from './service/get-task-caegories.service';
import { DeleteTaskCategoryService } from './service/delete-task-category.service';
import { UpdateTaskCategoryService } from './service/update-task-category.service';
import { AssignCategoryToTaskDto } from './dto/assign-category-to-task.dto';
import { AssignCategoryToTaskService } from './service/assign-category-to-task.service';
export class TaskCategoriesService {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }
  async createTaskCategory(user_email: string, body: CreateTaskCategoryDto) {
    return await new CreateTaskCategoryService(
      this.prisma,
      user_email,
      body,
    ).execute();
  }

  async getTaskCategories(user_email: string) {
    return await new GetTaskCategoriesService(
      this.prisma,
      user_email,
    ).execute();
  }
  async deleteTaskCategory(user_email: string, task_category_id: string) {
    return await new DeleteTaskCategoryService(
      this.prisma,
      user_email,
      task_category_id,
    ).execute();
  }
  async updateTaskCategory(user_email: string, body: CreateTaskCategoryDto) {
    return await new UpdateTaskCategoryService(
      this.prisma,
      user_email,
      body,
    ).execute();
  }

  async assignCategoryToTask(
    user_email: string,
    body: AssignCategoryToTaskDto,
  ) {
    return await new AssignCategoryToTaskService(
      this.prisma,
      user_email,
      body,
    ).execute();
  }
}
