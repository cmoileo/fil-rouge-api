import { HttpException, HttpStatus } from '@nestjs/common';
import HashPassword from '../../../shared/hash-password';
import GenerateJwt from '../../../shared/jwt-token/generate-jwt';
import { PrismaClient } from '@prisma/client';
import { RegisterAgencyDto } from '../dto/register-agency.dto';

export default class RegisterAgencyService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly body: RegisterAgencyDto,
  ) {}

  async execute() {
    if (this.body.password !== this.body.passwordConfirm) {
      throw new HttpException(
        'Password and confirm password do not match',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await new HashPassword(this.body.password).hash();

    await this.prisma.agency.create({
      data: {
        name: this.body.name,
        email: this.body.email,
        password: hashedPassword,
        house_number: this.body.house_number,
        street: this.body.street,
        city: this.body.city,
        zip_code: this.body.zip_code,
        country: this.body.country,
        employee_count: this.body.employee_count,
        plan: this.body.plan,
      },
    });

    const payload = { sub: this.body.email };
    const token = new GenerateJwt(payload, '30d').generate();

    return token;
  }
}