import { CreateCommentDto } from '../../dto/comments/create-comment.dto';
import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import MailerService from '../../../../shared/utils/mails/mail.service';

export class AddCommentService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_email: string,
    private readonly task_id: string,
    private readonly body: CreateCommentDto,
  ) {}
  async execute(): Promise<boolean | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.user_email,
        },
      });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      await this.prisma.comment.create({
        data: {
          content: this.body.content,
          author_id: user.id,
          agencyId: user.agency_id,
          task_id: this.task_id,
        },
      });
      const usersAssignedToTheTask = await this.prisma.assignedTask.findMany({
        where: {
          task_id: this.task_id,
        },
      });

      const task = await this.prisma.task.findUnique({
        where: {
          id: this.task_id,
        },
      });

      for (const userAssigned of usersAssignedToTheTask) {
        const employee = await this.prisma.user.findUnique({
          where: {
            id: userAssigned.employe_id,
          },
        });
        if (employee.email == user.email) return;
        await new MailerService(
          'New comment on a task',
          employee.email,
          'new-comment',
          {
            link: `${process.env.FRONT_URL}/dashboard/project/${task.project_id}`,
            firstname: employee.firstname,
          },
        ).sendMail();
      }
      return true;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }
}
