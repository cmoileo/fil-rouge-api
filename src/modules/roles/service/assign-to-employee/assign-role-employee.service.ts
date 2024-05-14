import { AssignRoleDto } from '../../dto/assign-role.dto';
import { PrismaClient } from '@prisma/client';

export class AssignRoleEmployee {
  constructor(
    private readonly prisma: PrismaClient,
    private userEmail: string,
    private body: AssignRoleDto,
  ) {}

  async execute(): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: this.userEmail,
        },
      });
      if (!user) {
        return false;
      }
      const employee = await this.prisma.user.findUnique({
        where: {
          id: this.body.user_id,
        },
      });
      if (!employee) {
        return false;
      }
      if (user.role === 'EMPLOYEE') {
        return false;
      }
      if (employee.role === 'OWNER') {
        return false;
      }
      await this.prisma.user.update({
        where: {
          id: this.body.user_id,
        },
        data: {
          role: this.body.role,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
