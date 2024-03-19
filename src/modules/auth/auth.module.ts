import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtAuthGuard],
})
export class AuthModule {}
