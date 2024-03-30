import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateRoleDto } from '../../dto/update-role.dto';

export class UpdateRoleService {
  constructor (
    private readonly prisma: PrismaClient,
    private readonly email: string,
    private readonly body: UpdateRoleDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.email },
      });
      if (!agency) {
        throw new HttpException('Agency not found', 404);
      }
      const role = await this.prisma.role.findFirst({
        where: { name: this.body.currentName, agency_id: agency.id },
      });
      if (!role) {
        throw new HttpException('Role not found', 404);
      }
      await this.prisma.role.update({
        where: { id: role.id },
        data: {
          name: this.body.newName,
          color: this.body.color,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error updating role', 400);
    }
  }
}
