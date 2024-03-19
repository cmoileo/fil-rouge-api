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

export class AuthService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }

  async registerAgency(body: RegisterAgencyDto) {
    const createAgency: string | HttpException =
      await new RegisterAgencyService(this.prisma, body).execute();
    return createAgency;
  }

  async loginAgency(body: LoginAgencyDto) {
    const loggedAgency: string | HttpException = await new LoginAgencyService(
      this.prisma,
      body,
    ).execute();
    return loggedAgency;
  }

  async registerEmployee(body: RegisterEmployeeDto) {
    const createEmployee: string | HttpException =
      await new RegisterEmployeeService(this.prisma, body).execute();
    return createEmployee;
  }

  async loginEmployee(body: LoginEmployeeDto) {
    const loggedEmployee: string | HttpException =
      await new LoginEmployeeService(this.prisma, body).execute();
    return loggedEmployee;
  }
}
