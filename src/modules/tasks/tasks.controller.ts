import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskType } from "../../shared/types/tasks/task.type";

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/create')
  async createTask(
    @Body() body: CreateTaskDto,
    @Req() req: any,
  ): Promise<boolean | HttpException> {
    const user_id = req.userEmail;
    return this.tasksService.createTask(user_id, body);
  }

  @Patch('/update/:task_id')
  async updateTask(
    @Param('task_id') task_id: string,
    @Body() body: UpdateTaskDto,
    @Req() req: any,
  ): Promise<boolean | HttpException> {
    const user_id = req.userEmail;
    return this.tasksService.updateTask(user_id, task_id, body);
  }

  @Delete('/delete/:task_id')
  async deleteTask(
    @Param('task_id') task_id: string,
    @Req() req: any,
  ): Promise<boolean | HttpException> {
    const user_id = req.userEmail;
    return this.tasksService.deleteTask(user_id, task_id);
  }

  @Get('/get/:task_id')
  async getTaskById(
    @Param('task_id') task_id: string,
    @Req() req: any,
  ): Promise<any> {
    const user_id = req.userEmail;
    return this.tasksService.getTaskById(user_id, task_id);
  }

  @Get('/get-all')
  async getAllTasks(@Req() req: any): Promise<TaskType[] | HttpException> {
    const user_email = req.userEmail;
    return this.tasksService.getAllTasks(user_email);
  }
}
