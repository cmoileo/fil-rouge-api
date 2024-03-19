import { RegisterAgencyDto } from './dto/register-agency.dto';
import { PrismaClient } from '@prisma/client';
import { LoginAgencyDto } from './dto/login-agency.dto';
import RegisterAgencyService from './service/register-agency.service';
import LoginAgencyService from './service/login-agency.service';
import { HttpException } from "@nestjs/common";

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
}
