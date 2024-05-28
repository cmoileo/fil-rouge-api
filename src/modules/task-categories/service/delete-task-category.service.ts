import { PrismaClient } from '@prisma/client';

export class DeleteTaskCategoryService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_email: string,
    private readonly task_category_id: string,
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
          id: this.task_category_id,
          agency_id: user.agency_id,
        },
      });

      if (!taskCategory) {
        throw new Error('Task category not found');
      }

      // Dissocier les tâches de la catégorie de tâches à supprimer
      await this.prisma.task.updateMany({
        where: {
          task_category_id: this.task_category_id,
        },
        data: {
          task_category_id: null,
        },
      });

      // Ensuite, supprimer la catégorie de tâches
      await this.prisma.taskCategory.delete({
        where: {
          id: this.task_category_id,
        },
      });

      return 'Task category deleted successfully';
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
