import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../adapter/auth.service';
import { RegisterAgencyDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterAgencyDto) {
    return this.authService.register(registerDto);
  }
}
