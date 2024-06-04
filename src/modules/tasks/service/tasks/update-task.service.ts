import { UpdateTaskDto } from '../../dto/tasks/update-task.dto';
import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import MailerService from '../../../../shared/utils/mail.service';

export class UpdateTaskService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_id: string,
    private readonly task_id: string,
    private readonly body: UpdateTaskDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const isTaskExists = await this.prisma.task.findFirst({
        where: {
          id: this.task_id,
        },
      });
      if (!isTaskExists) {
        throw new HttpException('Task not found', 404);
      }
      const user = await this.prisma.user.findFirst({
        where: {
          email: this.user_id,
        },
      });
      const task = await this.prisma.task.findFirst({
        where: {
          id: this.task_id,
        },
      });
      if (task.agencyId !== user.agency_id) {
        throw new HttpException('Unauthorized', 401);
      }
      await this.prisma.task.update({
        where: {
          id: this.task_id,
        },
        data: {
          name: this.body.name,
          description: this.body.description,
          progress_percentage: this.body.progress_percentage,
          finishing_date: this.body.finishing_date,
          starting_date: this.body.starting_date,
          project_id: this.body.project_id,
          kanban_state_id: this.body.kanban_state_id,
          agencyId: user.agency_id,
          task_state_id: this.body.task_state_id,
        },
      });
      if (this.body.assigned_users_id) {
        const assignedUsers = await this.prisma.assignedTask.findMany({
          where: {
            task_id: this.task_id,
          },
        });
        if (assignedUsers.length > 0) {
          for (const assignedUser of assignedUsers) {
            await this.prisma.assignedTask.delete({
              where: {
                id: assignedUser.id,
              },
            });
          }
        }
        for (const assigned_user_id of this.body.assigned_users_id) {
          await this.prisma.assignedTask.create({
            data: {
              task_id: this.task_id,
              employe_id: assigned_user_id,
            },
          });
          const employee = await this.prisma.user.findFirst({
            where: {
              id: assigned_user_id,
            },
          });
          if (employee.email == user.email) return;
          await new MailerService(
            'You have been assigned to a task',
            `${employee.firstname}, you have been assigned to a task, you can view it by clicking <a href="${process.env.FRONT_URL}/dashboard/project/${task.project_id}">here</a>.`,
            employee.email,
          ).sendMail();
        }
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal server error', 500);
    }
  }
}
