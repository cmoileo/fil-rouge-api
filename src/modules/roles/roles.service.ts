import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateJobDto } from './dto/create-job.dto';
import { CreateRoleService } from './service/crud-action/create-job.service';
import { UpdateJobService } from './service/crud-action/update-job.service';
import { UpdateJobDto } from './dto/update-job.dto';
import { DeleteJobService } from './service/crud-action/delete-job.service';
import { Role } from '../../shared/types/jobs/job.type';
import { GetJobService } from './service/crud-action/get-job.service';
import { AssignRoleJob } from './service/assign-to-employee/assign-role.job.service';
import { RemoveJobService } from './service/assign-to-employee/remove-job.service';

export class RolesService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }

  async getRoles(userEmail: string): Promise<Role[] | HttpException> {
    const roles: Role[] | HttpException = await new GetJobService(
      this.prisma,
      userEmail,
    ).execute();
    return roles;
  }

  async createRole(
    userEmail: string,
    body: CreateJobDto,
  ): Promise<boolean | HttpException> {
    const createdRole = await new CreateRoleService(
      this.prisma,
      userEmail,
      body,
    ).execute();
    return createdRole;
  }

  async updateRole(
    userEmail: string,
    body: UpdateJobDto,
  ): Promise<boolean | HttpException> {
    const updatedRole = await new UpdateJobService(
      this.prisma,
      userEmail,
      body,
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

  async assignRoleToEmployee(
    agencyEmail: string,
    body: any,
  ): Promise<boolean | HttpException> {
    const assignedRole = await new AssignRoleJob(
      this.prisma,
      agencyEmail,
      body,
    ).execute();
    return assignedRole;
  }

  async removeRoleFromEmployee(
    agencyEmail: string,
    body: any,
  ): Promise<boolean | HttpException> {
    const removedRole = await new RemoveJobService(
      this.prisma,
      agencyEmail,
      body,
    ).execute();
    return removedRole;
  }
}
