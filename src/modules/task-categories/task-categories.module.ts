import { Module } from '@nestjs/common';
import { TaskCategoriesController } from './task-categories.controller';
import { TaskCategoriesService } from './task-categories.service';

@Module({
  controllers: [TaskCategoriesController],
  providers: [TaskCategoriesService],
})
export class TaskCategoriesModule {}
