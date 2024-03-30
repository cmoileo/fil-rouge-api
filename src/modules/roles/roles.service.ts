import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateRoleService } from './service/crud-action/create-role.service';
import { UpdateRoleService } from './service/crud-action/update-role.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DeleteRoleService } from './service/crud-action/delete-role.service';
import { Role } from '../../shared/types/roles/role.type';
import { GetRolesService } from "./service/crud-action/get-roles.service";
import { AssignRoleService } from "./service/assign-to-employee/assign-role.service";
import { RemoveRoleService } from "./service/assign-to-employee/remove-role.service";

export class RolesService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }

  async getRoles(userEmail: string): Promise<Role[] | HttpException> {
    const roles: Role[] | HttpException = await new GetRolesService(
      this.prisma,
      userEmail,
    ).execute();
    return roles;
  }

  async createRole(
    userEmail: string,
    body: CreateRoleDto,
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
    body: UpdateRoleDto,
  ): Promise<boolean | HttpException> {
    const updatedRole = await new UpdateRoleService(
      this.prisma,
      userEmail,
      body,
    ).execute();
    return updatedRole;
  }

  async deleteRole(roleId: string): Promise<boolean | HttpException> {
    const deletedRole = await new DeleteRoleService(
      this.prisma,
      roleId,
    ).execute();
    return deletedRole;
  }

  async assignRoleToEmployee(
    agencyEmail: string,
    body: any,
  ): Promise<boolean | HttpException> {
    const assignedRole = await new AssignRoleService(
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
    const removedRole = await new RemoveRoleService(
      this.prisma,
      agencyEmail,
      body,
    ).execute();
    return removedRole;
  }
}
