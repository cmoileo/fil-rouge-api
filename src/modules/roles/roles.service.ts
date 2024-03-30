import { HttpException, Injectable } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';
import { CreateRoleDto } from "./dto/create-role.dto";
import { CreateRoleService } from "./service/create-role.service";

@Injectable()
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
}
