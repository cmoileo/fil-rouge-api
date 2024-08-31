import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAgencyDto } from './dto/agency/register-agency.dto';
import { LoginAgencyDto } from './dto/agency/login-agency.dto';
import { RegisterEmployeeDto } from './dto/employee/register-employee.dto';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { AddEmployeeAgencyDto } from './dto/agency/add-employee-agency.dto';
import { PasswordRecoveryAskDto } from './dto/password-recovery-ask.dto';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';
import { PasswordChangeDto } from './dto/password-change.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('agency/register')
  async registerAgency(@Body() body: RegisterAgencyDto) {
    console.log('body', body);
    return this.authService.registerAgency(body);
  }
  @UseGuards(JwtAuthGuard)
  @Post('agency/add-employee')
  async addEmployee(@Body() body: AddEmployeeAgencyDto, @Req() req: any) {
    const userEmail = req.userEmail;
    return this.authService.addEmployee(body, userEmail);
  }

  @Post('agency/remove-employee')
  @UseGuards(JwtAuthGuard)
  async removeEmployee(@Body() body: AddEmployeeAgencyDto, @Req() req: any) {
    const userEmail = req.userEmail;
    return this.authService.removeEmployee(body, userEmail);
  }

  @Post('employee/register/:id')
  async registerEmployee(
    @Param('id') id: string,
    @Body() body: RegisterEmployeeDto,
  ) {
    const base64Data = body.avatar.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const file = {
      fieldname: 'avatar',
      originalname: `avatar_${Date.now()}.png`,
      mimetype: 'image/png',
      buffer: buffer,
      size: buffer.length,
    };

    body.avatar = file;

    return this.authService.registerEmployee(id, body);
  }

  @Post('employee/login')
  async loginEmployee(@Body() body: LoginAgencyDto) {
    return this.authService.loginEmployee(body);
  }

  @Post('password-recovery-ask')
  async passwordRecovery(@Body() body: PasswordRecoveryAskDto) {
    return this.authService.passwordRecovery(body);
  }
  @Post('password-recovery/:id')
  async passwordRecoveryChange(
    @Param('id') id: string,
    @Body() body: PasswordRecoveryDto,
  ) {
    return this.authService.passwordRecoveryChange(id, body);
  }

  @Post('employee/password-change')
  @UseGuards(JwtAuthGuard)
  async passwordChangeEmployee(
    @Body() body: PasswordChangeDto,
    @Req() req: any,
  ) {
    const userEmail = req.userEmail;
    return this.authService.passwordChangeEmployee(userEmail, body);
  }
}
