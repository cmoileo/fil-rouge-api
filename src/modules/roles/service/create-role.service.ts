import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';

export class CreateRoleService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly email: string,
    private readonly body: CreateRoleDto,
  ) {}

  async execute(): Promise<boolean | HttpException> {
    try {
      const agency = await this.prisma.agency.findUnique({
        where: { email: this.email },
      });
      if (!agency) {
        throw new HttpException('Agency not found', 404);
      }
    } catch (error) {
      throw new HttpException('Error creating role', 400);
    }
    return true;
  }
}
