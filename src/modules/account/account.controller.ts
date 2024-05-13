import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { ChangeRoleDto } from './dto/change-role.dto';
import { RoleEnum } from '../../shared/enum/role/role.enum';
import { AccountService } from './account.service';
import { AccountType } from '../../shared/types/account/account.type';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Post('change-role/:role')
  @UseGuards(JwtAuthGuard)
  async changeRole(
    @Body() body: ChangeRoleDto,
    @Req() req: any,
  ): Promise<string | HttpException> {
    const user_email = req.userEmail;
    const role: RoleEnum = req.params.role;
    return await this.accountService.changeRole(user_email, role, body);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  async updateAccount(
    @Body() body: UpdateAccountDto,
    @Req() req: any,
  ): Promise<AccountType | HttpException> {
    const user_email = req.userEmail;
    return await this.accountService.updateAccount(user_email, body);
  }

  @Get('get-users')
  @UseGuards(JwtAuthGuard)
  async getUsers(@Req() req: any): Promise<AccountType[] | HttpException> {
    const user_email = req.userEmail;
    return await this.accountService.getUsers(user_email);
  }
}
