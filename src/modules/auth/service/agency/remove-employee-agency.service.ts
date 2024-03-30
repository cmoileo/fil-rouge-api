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
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.agencyEmail },
      });
      const employee = await this.prisma.user.findUnique({
        where: { email: this.body.email },
      });
      if (!agency) {
        throw new HttpException('Agency not found', 404);
      }
      if (!employee) {
        throw new HttpException('Employee not found', 404);
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
