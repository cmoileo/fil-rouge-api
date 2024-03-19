import { HttpException, HttpStatus } from '@nestjs/common';
import { RegisterAgencyDto } from './dto/register-agency.dto';
import { PrismaClient } from '@prisma/client';
import { LoginAgencyDto } from './dto/login-agency.dto';
import HashPassword from '../../shared/hash-password';
import GenerateJwt from '../../shared/generate-jwt';

export class AuthService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }
  async registerAgency(body: RegisterAgencyDto) {
    if (body.password !== body.passwordConfirm) {
      throw new HttpException(
        'Password and confirm password do not match',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await new HashPassword(body.password).hash();

    await this.prisma.agency.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        house_number: body.house_number,
        street: body.street,
        city: body.city,
        zip_code: body.zip_code,
        country: body.country,
        employee_count: body.employee_count,
        plan: body.plan,
      },
    });

    const payload = { sub: body.email };
    const token = new GenerateJwt(payload, '1m').generate();

    return token;
  }

  async loginAgency(body: LoginAgencyDto) {
    const agency = await this.prisma.agency.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!agency) {
      throw new HttpException('Agency not found', HttpStatus.NOT_FOUND);
    }

    const passwordMatch = await new HashPassword(body.password).compare(
      agency.password,
    );

    if (!passwordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: agency.email };
    const token = new GenerateJwt(payload, '1m').generate();

    return token;
  }
}
