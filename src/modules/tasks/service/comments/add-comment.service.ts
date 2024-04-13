import { CreateCommentDto } from '../../dto/comments/create-comment.dto';
import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';

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
      console.log(user);
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
      return true;
    } catch (error) {
      // console.log(error)
      throw new HttpException('Internal server error', 500);
    }
  }
}
