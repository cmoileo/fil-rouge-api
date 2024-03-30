import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class DeleteRoleService {
  constructor (
    private readonly prisma: PrismaClient,
    private readonly roleId: string,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const role = await this.prisma.role.findUnique({
        where: { id: this.roleId },
      });
      if (!role) {
        return new HttpException('Role not found', 404);
      }
      await this.prisma.role.delete({
        where: { id: this.roleId },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error deleting role', 400);
    }
  }
}
