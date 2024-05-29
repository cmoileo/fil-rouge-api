import { PrismaClient, Project } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import storageService from '../../../shared/utils/supabase/storage.service';

export class GetProjectByIdService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly project_id: string,
  ) {}
  async execute(): Promise<Project | HttpException> {
    try {
      const project = await this.prisma.project.findUnique({
        where: {
          id: this.project_id,
        },
        include: {
          tasks: {
            include: {
              task_users: {
                include: {
                  employe: true,
                },
              },
            },
          },
        },
      });
      if (!project) {
        throw new HttpException('Project not found', 404);
      }
      for (const task of project.tasks) {
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
      }
      return project;
    } catch (error) {
      throw new HttpException('Error while fetching project', 500);
    }
  }
}
