import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { ChangeRoleDto } from './dto/change-role.dto';
import { RoleEnum } from '../../shared/enum/role/role.enum';

@Controller('account')
export class AccountController {
  @Post('change-role/:role')
  @UseGuards(JwtAuthGuard)
  async changeRole(
    @Body() body: ChangeRoleDto,
    @Req() req: any,
  ): Promise<string | HttpException> {
    const user_email = req.userEmail;
    const role: RoleEnum = req.params.role;
    return 'OWNER';
  }
}
