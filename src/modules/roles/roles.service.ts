import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateRoleService } from './service/create-role.service';
import { UpdateRoleService } from './service/update-role.service';
import { UpdateRoleDto } from "./dto/update-role.dto";

export class RolesService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient();
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
}
