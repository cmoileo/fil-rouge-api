import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';

export class DeleteCommentByIdService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_email: string,
    private readonly comment_id: string,
  ) {}
  async execute(): Promise<boolean | HttpException> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: this.user_email,
        },
      });
      const comment = await this.prisma.comment.findFirst({
        where: {
          id: this.comment_id,
        },
      });
      if (comment.agencyId !== user.agency_id) {
        throw new HttpException('Unauthorized', 401);
      }
      await this.prisma.comment.delete({
        where: {
          id: this.comment_id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal server error', 500);
    }
  }
}
