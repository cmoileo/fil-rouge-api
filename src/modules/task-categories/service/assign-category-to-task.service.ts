import { PrismaClient } from '@prisma/client';
import { AssignCategoryToTaskDto } from '../dto/assign-category-to-task.dto';

export class AssignCategoryToTaskService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_email: string,
    private readonly body: AssignCategoryToTaskDto,
  ) {}

  async execute() {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.user_email,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      const task = await this.prisma.task.findUnique({
        where: {
          id: this.body.task_id,
          agencyId: user.agency_id,
        },
      });
      if (!task) {
        throw new Error('Task not found');
      }
      const taskCategory = await this.prisma.taskCategory.findUnique({
        where: {
          id: this.body.task_category_id,
          agency_id: user.agency_id,
        },
      });
      if (!taskCategory) {
        throw new Error('Task category not found');
      }
      const updatedTask = await this.prisma.task.update({
        where: {
          id: this.body.task_id,
          agencyId: user.agency_id,
        },
        data: {
          task_category_id: this.body.task_category_id,
        },
      });
      return updatedTask;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
