import { PrismaClient } from '@prisma/client';
import { CreateTaskCategoryDto } from '../dto/create-task-category.dto';

export class UpdateTaskCategoryService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_email: string,
    private readonly body: CreateTaskCategoryDto,
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
      const taskCategory = await this.prisma.taskCategory.findUnique({
        where: {
          id: this.body.id,
          agency_id: user.agency_id,
        },
      });
      if (!taskCategory) {
        throw new Error('Task category not found');
      }
      const updatedTaskCategory = await this.prisma.taskCategory.update({
        where: {
          id: this.body.id,
        },
        data: this.body,
      });
      return updatedTaskCategory;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
