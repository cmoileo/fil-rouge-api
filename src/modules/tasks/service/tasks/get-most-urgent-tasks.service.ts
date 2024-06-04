import { PrismaClient, Task } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import storageService from '../../../../shared/utils/supabase/storage.service';

export class GetMostUrgentTasksService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly user_email: string,
  ) {}

  async execute(): Promise<Task[] | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.user_email,
        },
      });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      const agency = await this.prisma.agency.findUnique({
        where: {
          id: user.agency_id,
        },
      });
      if (!agency) {
        throw new HttpException('Agency not found', 404);
      }
      const tasks = await this.prisma.task.findMany({
        where: {
          agencyId: user.agency_id,
        },
        orderBy: {
          finishing_date: 'desc',
        },
        include: {
          task_users: {
            include: {
              employe: true,
            },
          },
          comments: {
            include: {
              author: true,
            },
          },
        },
      });
      for (const task of tasks) {
        for (const taskUser of task.task_users) {
          if (taskUser.employe.profile_picture_url) {
            try {
              const signedUrl = await storageService.getSignedUrl(
                taskUser.employe.profile_picture_url,
              );
              taskUser.employe.profile_picture_url = signedUrl;
            } catch (error) {
              console.error('Error getting signed URL:', error);
              taskUser.employe.profile_picture_url = null;
            }
          } else {
            taskUser.employe.profile_picture_url = null;
          }
        }
        for (const comment of task.comments) {
          if (comment.author.profile_picture_url) {
            try {
              const signedUrl = await storageService.getSignedUrl(
                comment.author.profile_picture_url,
              );
              comment.author.profile_picture_url = signedUrl;
            } catch (error) {
              console.error('Error getting signed URL:', error);
              comment.author.profile_picture_url = null;
            }
          } else {
            comment.author.profile_picture_url = null;
          }
        }
      }
      return tasks;
    } catch (error) {
      console.log(error);
      return new HttpException('Internal server error', 500);
    }
  }
}
