import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskCategoriesService } from './task-categories.service';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('task-categories')
export class TaskCategoriesController {
  constructor(private readonly taskCategoriesService: TaskCategoriesService) {}
  @Post()
  async createTaskCategory(
    @Req() req: any,
    @Body() body: CreateTaskCategoryDto,
  ) {
    const user_email = req.userEmail;
    return this.taskCategoriesService.createTaskCategory(user_email, body);
  }

  @Get()
  async getTaskCategories(@Req() req: any) {
    const user_email = req.userEmail;
    return this.taskCategoriesService.getTaskCategories(user_email);
  }

  @Delete(':id')
  async deleteTaskCategory(@Req() req: any) {
    const user_email = req.userEmail;
    const task_category_id = req.params.id;
    return this.taskCategoriesService.deleteTaskCategory(
      user_email,
      task_category_id,
    );
  }
}
