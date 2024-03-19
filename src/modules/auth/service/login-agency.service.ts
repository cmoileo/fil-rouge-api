import { PrismaClient } from '@prisma/client';
import { LoginAgencyDto } from '../dto/login-agency.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import HashPassword from '../../../shared/hash-password';
import GenerateJwt from '../../../shared/jwt-token/generate-jwt';

export default class LoginAgencyService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly body: LoginAgencyDto,
  ) {}

  async execute() {
    const agency = await this.prisma.agency.findUnique({
      where: {
        email: this.body.email,
      },
    });

    if (!agency) {
      throw new HttpException('Agency not found', HttpStatus.NOT_FOUND);
    }

    const passwordMatch = await new HashPassword(this.body.password).compare(
      agency.password,
    );

    if (!passwordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: agency.email };
    const token = new GenerateJwt(payload, '30d').generate();

    return token;
  }
}
