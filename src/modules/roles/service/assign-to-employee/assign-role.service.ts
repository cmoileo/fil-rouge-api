import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { AssignRoleDto } from "../../dto/assign-role.dto";

export class AssignRoleService {
  constructor(
    private prisma: PrismaClient,
    private agencyEmail: string,
    private body: AssignRoleDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.agencyEmail },
      });
      if (!agency) {
        return new HttpException('Agency not found', 404);
      }
      const employee = await this.prisma.user.findUnique({
        where: {
          id: this.body.user_id,
          agency_id: agency.id,
        },
      });
      if (!employee) {
        return new HttpException('Employee not found', 404);
      }
      await this.prisma.rolesUsers.create({
        data: {
          role_id: this.body.role_id,
          user_id: this.body.user_id,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error assigning role', 400)
    }
    return true;
  }
}