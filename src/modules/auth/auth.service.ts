import { RegisterAgencyDto } from './dto/agency/register-agency.dto';
import { PrismaClient } from '@prisma/client';
import { LoginAgencyDto } from './dto/agency/login-agency.dto';
import RegisterAgencyService from './service/agency/register-agency.service';
import { HttpException } from '@nestjs/common';
import RegisterEmployeeService from './service/employee/register-employee.service';
import { RegisterEmployeeDto } from './dto/employee/register-employee.dto';
import { LoginEmployeeDto } from './dto/employee/login-employee.dto';
import LoginEmployeeService from './service/employee/login-employee.service';
import { AddEmployeeAgencyDto } from './dto/agency/add-employee-agency.dto';
import AddEmployeeAgencyService from './service/agency/add-employee-agency.service';
import { PasswordRecoveryAskService } from './service/password-recovery-ask.service';
import { PasswordRecoveryAskDto } from './dto/password-recovery-ask.dto';
import { PasswordRecoveryService } from './service/password-recovery.service';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';
import { PasswordChangeDto } from './dto/password-change.dto';
import EmployeePasswordChangeService from './service/employee/password-employee-change.service';
import { RemoveEmployeeAgencyService } from './service/agency/remove-employee-agency.service';

export class AuthService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }

  async registerAgency(
    body: RegisterAgencyDto,
  ): Promise<{ token: string } | HttpException> {
    const createAgency: { token: string } | HttpException =
      await new RegisterAgencyService(this.prisma, body).execute();
    return createAgency;
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

  async loginEmployee(
    body: LoginEmployeeDto,
  ): Promise<{ token: string } | HttpException> {
    const loggedEmployee: { token: string } | HttpException =
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

  async passwordRecoveryChange(
    id: string,
    body: PasswordRecoveryDto,
  ): Promise<boolean | HttpException> {
    const recovery = await new PasswordRecoveryService(
      id,
      this.prisma,
      body,
    ).execute();
    return recovery;
  }

  async passwordChangeEmployee(
    userEmail: string,
    body: PasswordChangeDto,
  ): Promise<boolean | HttpException> {
    const change = await new EmployeePasswordChangeService(
      this.prisma,
      userEmail,
      body,
    ).execute();
    return change;
  }

  async removeEmployee(
    body: AddEmployeeAgencyDto,
    userEmail: string,
  ): Promise<boolean | HttpException> {
    const removeEmployee = await new RemoveEmployeeAgencyService(
      this.prisma,
      body,
      userEmail,
    ).execute();
    return removeEmployee;
  }
}
