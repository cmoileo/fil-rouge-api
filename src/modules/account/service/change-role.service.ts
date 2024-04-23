import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RoleEnum } from '../../../shared/enum/role/role.enum';
import { ChangeRoleDto } from '../dto/change-role.dto';

export class ChangeRoleService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly email: string,
    private readonly role: RoleEnum,
    private readonly body: ChangeRoleDto,
  ) {}
  async execute(): Promise<string | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: this.email },
      });
      if (!user) {
        return new HttpException('User not found', 404);
      }
      const employee = await this.prisma.user.findUnique({
        where: { id: this.body.user_id },
      });
      if (!employee) {
        return new HttpException('Employee not found', 404);
      }
      if (user.role !== RoleEnum.OWNER && user.role !== RoleEnum.ADMIN) {
        return new HttpException('Unauthorized', 401);
      }
      if (employee.role === RoleEnum.OWNER) {
        return new HttpException('Cannot change owner role', 400);
      }
      await this.prisma.user.update({
        where: { id: this.body.user_id },
        data: { role: this.role },
      });
      return this.role;
    } catch (error) {
      throw new HttpException('Error changing role', 400);
    }
  }
}
