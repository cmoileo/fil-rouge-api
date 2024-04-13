import { HttpException } from '@nestjs/common';

export class EditCommentService {
  constructor(
    private readonly prisma: any,
    private readonly user_email: string,
    private readonly comment_id: string,
    private readonly body: any,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const comment = await this.prisma.comment.findFirst({
        where: {
          id: this.comment_id,
        },
      });
      if (!comment) {
        throw new HttpException('Comment not found', 404);
      }
      const user = await this.prisma.user.findFirst({
        where: {
          email: this.user_email,
        },
      });
      if (comment.author_id !== user.id) {
        throw new HttpException('Unauthorized', 401);
      }
      await this.prisma.comment.update({
        where: {
          id: this.comment_id,
        },
        data: {
          content: this.body.content,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }
}
