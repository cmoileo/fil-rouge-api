import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { CommentType } from '../../../../shared/types/comment/comment.type';

export class GetCommentsByTaskIdService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_email: string,
    private readonly task_id: string,
  ) {}
  async execute(): Promise<CommentType[] | HttpException> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: this.user_email,
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
      const comments = await this.prisma.comment.findMany({
        where: {
          task_id: this.task_id,
        },
      });
      return comments;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }
}
