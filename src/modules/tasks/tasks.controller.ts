import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { CreateTaskDto } from './dto/create-task.dto';

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
}
