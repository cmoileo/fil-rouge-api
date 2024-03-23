import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { RegisterAgencyDto } from './dto/agency/register-agency.dto';
import { LoginAgencyDto } from './dto/agency/login-agency.dto';
import { RegisterEmployeeDto } from './dto/employee/register-employee.dto';
import { JwtAuthGuard } from "../guards/verify-jwt.guard";
import { AddEmployeeAgencyDto } from "./dto/agency/add-employee-agency.dto";
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('agency/register')
  async registerAgency(@Body() body: RegisterAgencyDto) {
    return this.authService.registerAgency(body);
  }

  @Post('agency/login')
  async loginAgency(@Body() body: LoginAgencyDto) {
    return this.authService.loginAgency(body);
  }
  @UseGuards(JwtAuthGuard)
  @Post('agency/add-employee')
  async addEmployee(@Body() body: AddEmployeeAgencyDto, @Req() req: any) {
    const userEmail = req.userEmail;
    return this.authService.addEmployee(body, userEmail);
  }

  @Post('employee/register')
  async registerEmployee(@Body() body: RegisterEmployeeDto) {
    return this.authService.registerEmployee(body);
  }

  @Post('employee/login')
  async loginEmployee(@Body() body: LoginAgencyDto) {
    return this.authService.loginEmployee(body);
  }
}
