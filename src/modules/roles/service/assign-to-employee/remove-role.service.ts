import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { RemoveRoleDto } from '../../dto/remove-role.dto';

export class RemoveRoleService {
  constructor(
    private prisma: PrismaClient,
    private agencyEmail: string,
    private body: RemoveRoleDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.agencyEmail },
      });
      if (!agency) {
        return new HttpException('Agency not found', 404);
      }
      const roles_user = await this.prisma.rolesUsers.findFirst({
        where: { id: this.body.roles_user_id, agencyId: agency.id },
      });
      console.log(this.body.roles_user_id, agency.id);
      if (!roles_user) {
        return new HttpException('Role not found', 404);
      }
      await this.prisma.rolesUsers.delete({
        where: { id: roles_user.id },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error removing role', 400);
    }
  }
}
