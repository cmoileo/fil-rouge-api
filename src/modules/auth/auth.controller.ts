import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAgencyDto } from './dto/register-agency.dto';
import { LoginAgencyDto } from './dto/login-agency.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('agency/register')
  async register(@Body() registerDto: RegisterAgencyDto) {
    return this.authService.registerAgency(registerDto);
  }

  @Post('agency/login')
  async login(@Body() loginDto: LoginAgencyDto) {
    return this.authService.loginAgency(loginDto);
  }
}
