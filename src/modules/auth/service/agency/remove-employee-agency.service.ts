import { HttpException } from '@nestjs/common';
import { AddEmployeeAgencyDto } from '../../dto/agency/add-employee-agency.dto';
import { PrismaClient } from '@prisma/client';

export class RemoveEmployeeAgencyService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly body: AddEmployeeAgencyDto,
    private readonly agencyEmail: string,
  ) {}
  async execute(): Promise<boolean | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: this.agencyEmail },
      });
      if (!user) {
        throw new HttpException('Agency not found', 404);
      }
      if (user.role !== 'OWNER' || 'ADMIN') {
        throw new HttpException('Unauthorized', 401);
      }
      await this.prisma.user.delete({
        where: { email: this.body.email },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error', 400);
    }
  }
}
