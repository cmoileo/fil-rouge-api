import { RegisterAgencyDto } from './dto/agency/register-agency.dto';
import { PrismaClient } from '@prisma/client';
import { LoginAgencyDto } from './dto/agency/login-agency.dto';
import RegisterAgencyService from './service/agency/register-agency.service';
import LoginAgencyService from './service/agency/login-agency.service';
import { HttpException } from '@nestjs/common';
import RegisterEmployeeService from './service/employee/register-employee.service';
import { RegisterEmployeeDto } from './dto/employee/register-employee.dto';
import { LoginEmployeeDto } from './dto/employee/login-employee.dto';
import LoginEmployeeService from './service/employee/login-employee.service';
import { AddEmployeeAgencyDto } from './dto/agency/add-employee-agency.dto';
import AddEmployeeAgencyService from './service/agency/add-employee-agency.service';
import { PasswordRecoveryAskService } from './service/password-recovery-ask.service';
import { PasswordRecoveryAskDto } from './dto/password-recovery-ask.dto';

export class AuthService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }

  async registerAgency(
    body: RegisterAgencyDto,
  ): Promise<string | HttpException> {
    const createAgency: string | HttpException =
      await new RegisterAgencyService(this.prisma, body).execute();
    return createAgency;
  }

  async loginAgency(body: LoginAgencyDto): Promise<string | HttpException> {
    const loggedAgency: string | HttpException = await new LoginAgencyService(
      this.prisma,
      body,
    ).execute();
    return loggedAgency;
  }
  async addEmployee(body: AddEmployeeAgencyDto, userEmail: string) {
    const addEmployeeAgency = await new AddEmployeeAgencyService(
      this.prisma,
      body,
      userEmail,
    ).execute();
    return addEmployeeAgency;
  }

  async registerEmployee(
    id: string,
    body: RegisterEmployeeDto,
  ): Promise<string | HttpException> {
    const createEmployee: string | HttpException =
      await new RegisterEmployeeService(this.prisma, body, id).execute();
    return createEmployee;
  }

  async loginEmployee(body: LoginEmployeeDto): Promise<string | HttpException> {
    const loggedEmployee: string | HttpException =
      await new LoginEmployeeService(this.prisma, body).execute();
    return loggedEmployee;
  }

  async passwordRecovery(
    body: PasswordRecoveryAskDto,
  ): Promise<boolean | HttpException> {
    const recovery = await new PasswordRecoveryAskService(
      this.prisma,
      body,
    ).execute();
    return recovery;
  }
}
