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
import { CreateTaskDto } from './dto/tasks/create-task.dto';
import { UpdateTaskDto } from './dto/tasks/update-task.dto';
import { TaskType } from '../../shared/types/tasks/task.type';

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
  @Post('/add-comment/:task_id')
  async addCommentToTask(
    @Param('task_id') task_id: string,
    @Body() body: any,
    @Req() req: any,
  ): Promise<boolean | HttpException> {
    const user_id = req.userEmail;
    return this.tasksService.addCommentToTask(user_id, task_id, body);
  }
  @Patch('/edit-comment/:comment_id')
  async editComment(
    @Param('comment_id') comment_id: string,
    @Body() body: any,
    @Req() req: any,
  ): Promise<boolean | HttpException> {
    const user_id = req.userEmail;
    return this.tasksService.editComment(user_id, comment_id, body);
  }

  @Get('/get-comment/:comment_id')
  async GetCommentById(
    @Param('comment_id') comment_id: string,
    @Req() req: any,
  ): Promise<any> {
    const user_email = req.userEmail;
    return this.tasksService.GetCommentById(user_email, comment_id);
  }

  @Get('/get-comments/:task_id')
  async getCommentsByTaskId(
    @Param('task_id') task_id: string,
    @Req() req: any,
  ): Promise<any> {
    const user_email = req.userEmail;
    return this.tasksService.getCommentsByTaskId(user_email, task_id);
  }

  @Delete('/delete-comment/:comment_id')
  async deleteCommentById(
    @Param('comment_id') comment_id: string,
    @Req() req: any,
  ): Promise<boolean | HttpException> {
    const user_email = req.userEmail;
    return this.tasksService.deleteCommentById(user_email, comment_id);
  }
}
