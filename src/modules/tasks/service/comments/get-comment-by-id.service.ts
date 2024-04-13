import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { CommentType } from "../../../../shared/types/comment/comment.type";

export class GetCommentByIdService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly comment_id: string,
    private readonly user_email: string,
  ) {}

  async execute(): Promise<CommentType | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.user_email,
        },
        select: {
          agency_id: true,
        },
      });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      const comment: CommentType = await this.prisma.comment.findFirst({
        where: {
          id: this.comment_id,
          agencyId: user.agency_id,
        },
      });
      if (!comment) {
        throw new HttpException('Comment not found', 404);
      }
      if (comment.agencyId !== user.agency_id) {
        throw new HttpException('Unauthorized', 401);
      }
      return comment;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }
}
