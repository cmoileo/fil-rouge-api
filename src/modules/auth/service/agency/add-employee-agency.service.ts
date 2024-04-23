import { PrismaClient } from '@prisma/client';
import { AddEmployeeAgencyDto } from '../../dto/agency/add-employee-agency.dto';
import { HttpException } from '@nestjs/common';
import MailerService from '../../../../shared/utils/mail.service';
import * as process from 'process';

export default class AddEmployeeAgencyService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly body: AddEmployeeAgencyDto,
    private readonly userEmail: string,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    const existingEmployee = await this.prisma.user.findUnique({
      where: {
        email: this.body.email,
      },
    });
    const existingPendingEmployee =
      await this.prisma.pendingEmployee.findUnique({
        where: {
          email: this.body.email,
        },
      });
    if (existingEmployee || existingPendingEmployee) {
      return new HttpException('Employee already exists', 400);
    }
    const user = await this.prisma.user.findUnique({
      where: {
        email: this.userEmail,
      },
    });
    if (!user) {
      return new HttpException('User not found', 404);
    }
    if (user.role !== 'OWNER' || 'ADMIN') {
      return new HttpException('Unauthorized', 401);
    }
    const newEmployee = await this.prisma.pendingEmployee.create({
      data: {
        email: this.body.email,
        agency_id: user.agency_id,
        role: this.body.role,
      },
    });
    const agency = await this.prisma.agency.findUnique({
      where: {
        id: user.agency_id,
      },
    });
    try {
      await new MailerService(
        "You've been invited to join an agency",
        `You've been invited to join ${agency.name}. Click <a href="${process.env.API_URL}/auth/employee/register/${newEmployee.id}">here</a> to accept the invitation`,
        newEmployee.email,
      ).sendMail();
      return true;
    } catch (error) {
      console.log(error);
      return new HttpException('Error sending email', 500);
    }
  }
}
