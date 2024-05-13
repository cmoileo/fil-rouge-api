import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RoleEnum } from '../../shared/enum/role/role.enum';
import { ChangeRoleService } from './service/change-role.service';
import { ChangeRoleDto } from './dto/change-role.dto';
import { UpdateAccountService } from './service/update-account.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountType } from '../../shared/types/account/account.type';
import { GetUsersService } from './service/get-users.service';

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

  async updateAccount(
    user_email: string,
    body: UpdateAccountDto,
  ): Promise<AccountType | HttpException> {
    return await new UpdateAccountService(
      this.prisma,
      user_email,
      body,
    ).execute();
  }

  async getUsers(user_email: string): Promise<AccountType[] | HttpException> {
    return await new GetUsersService(this.prisma, user_email).execute();
  }
}
