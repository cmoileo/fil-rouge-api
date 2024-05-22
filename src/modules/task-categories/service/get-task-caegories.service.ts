import { PrismaClient } from '@prisma/client';

export class GetTaskCategoriesService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_email: string,
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
      const taskCategories = await this.prisma.taskCategory.findMany({
        where: {
          agency_id: user.agency_id,
        },
      });
      return taskCategories;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
