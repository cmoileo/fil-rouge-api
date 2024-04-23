import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RoleEnum } from '../../shared/enum/role/role.enum';
import { ChangeRoleService } from './service/change-role.service';
import { ChangeRoleDto } from './dto/change-role.dto';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }
  async changeRole(
    user_email: string,
    role: RoleEnum,
    body: ChangeRoleDto,
  ): Promise<string | HttpException> {
    return await new ChangeRoleService(
      this.prisma,
      user_email,
      role,
      body,
    ).execute();
  }
}
