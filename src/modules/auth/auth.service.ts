import { RegisterAgencyDto } from './dto/register-agency.dto';
import { PrismaClient } from '@prisma/client';
import { LoginAgencyDto } from './dto/login-agency.dto';
import RegisterAgencyService from './service/register-agency.service';
import LoginAgencyService from './service/login-agency.service';

export class AuthService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }

  async registerAgency(body: RegisterAgencyDto) {
    const createAgency = await new RegisterAgencyService(
      this.prisma,
      body,
    ).execute();
    return createAgency;
  }

  async loginAgency(body: LoginAgencyDto) {
    const loggedAgency = await new LoginAgencyService(
      this.prisma,
      body,
    ).execute();
    return loggedAgency;
  }
}
