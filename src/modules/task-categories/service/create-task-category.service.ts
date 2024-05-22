import { PrismaClient } from '@prisma/client';
import { CreateTaskCategoryDto } from '../dto/create-task-category.dto';

export class CreateTaskCategoryService {
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
      const taskCategory = await this.prisma.taskCategory.create({
        data: {
          name: this.body.name,
          color: this.body.color,
          agency_id: user.agency_id,
        },
      });
      return taskCategory;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
