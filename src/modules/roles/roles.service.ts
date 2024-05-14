import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateJobDto } from './dto/create-job.dto';
import { CreateJobService } from './service/crud-action/create-job.service';
import { UpdateJobService } from './service/crud-action/update-job.service';
import { UpdateJobDto } from './dto/update-job.dto';
import { DeleteJobService } from './service/crud-action/delete-job.service';
import { Job } from '../../shared/types/jobs/job.type';
import { GetJobService } from './service/crud-action/get-job.service';
import { AssignJobJob } from './service/assign-to-employee/assign-role.job.service';
import { RemoveJobService } from './service/assign-to-employee/remove-job.service';
import { AssignRoleEmployee } from './service/assign-to-employee/assign-role-employee.service';

export class RolesService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }

  async getRoles(userEmail: string): Promise<Job[] | HttpException> {
    const roles: Job[] | HttpException = await new GetJobService(
      this.prisma,
      userEmail,
    ).execute();
    return roles;
  }

  async createRole(
    userEmail: string,
    body: CreateJobDto,
  ): Promise<Job | HttpException> {
    const createdRole = await new CreateJobService(
      this.prisma,
      userEmail,
      body,
    ).execute();
    return createdRole;
  }

  async updateRole(
    userEmail: string,
    body: UpdateJobDto,
    roleId: string,
  ): Promise<boolean | HttpException> {
    const updatedRole = await new UpdateJobService(
      this.prisma,
      userEmail,
      body,
      roleId,
    ).execute();
    return updatedRole;
  }

  async deleteRole(roleId: string): Promise<boolean | HttpException> {
    const deletedRole = await new DeleteJobService(
      this.prisma,
      roleId,
    ).execute();
    return deletedRole;
  }

  async assignJobToEmployee(
    agencyEmail: string,
    body: any,
  ): Promise<boolean | HttpException> {
    const assignedRole = await new AssignJobJob(
      this.prisma,
      agencyEmail,
      body,
    ).execute();
    return assignedRole;
  }

  async assignRoleToEmployee(
    userEmail: string,
    body: any,
  ): Promise<boolean | HttpException> {
    const assignedRole = await new AssignRoleEmployee(
      this.prisma,
      userEmail,
      body,
    ).execute();
    return assignedRole;
  }

  // async removeRoleFromEmployee(
  //   agencyEmail: string,
  //   body: any,
  // ): Promise<boolean | HttpException> {
  //   const removedRole = await new RemoveJobService(
  //     this.prisma,
  //     agencyEmail,
  //     body,
  //   ).execute();
  //   return removedRole;
  // }
}
