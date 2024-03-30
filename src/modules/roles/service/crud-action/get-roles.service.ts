import { PrismaClient } from "@prisma/client";
import { Role } from "../../../../shared/types/roles/role.type";
import { HttpException } from "@nestjs/common";

export class GetRolesService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly email: string,
  ) {}
  async execute(): Promise<Role[] | HttpException> {
    try {
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.email },
      });
      if (!agency) {
        return new HttpException('Agency not found', 404);
      }
      const roles = await this.prisma.role.findMany({
        where: { agency_id: agency.id },
      });
      return roles;
    } catch (error) {
      throw new HttpException('Error getting roles', 500);
    }
  }
}
