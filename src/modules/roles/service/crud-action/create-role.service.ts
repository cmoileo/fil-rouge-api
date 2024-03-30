import { PrismaClient } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { CreateRoleDto } from '../../dto/create-role.dto';

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
        return new HttpException('Agency not found', 404);
      }
      const isAlreadyRole = await this.prisma.role.findFirst({
        where: { name: this.body.name, agency_id: agency.id },
      });
      console.log(isAlreadyRole);
      if (isAlreadyRole) {
        return new HttpException('Role already exists', 400);
      }
      await this.prisma.role.create({
        data: {
          name: this.body.name,
          color: this.body.color,
          agency_id: agency.id,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error creating role', 400);
    }
    return true;
  }
}
