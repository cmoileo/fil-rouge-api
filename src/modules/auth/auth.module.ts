import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { PasswordRecoveryAskService } from './service/password-recovery-ask.service';
import { PasswordRecoveryService } from './service/password-recovery.service';
import { AgencyPasswordChangeService } from './service/agency/password-agency-change.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordRecoveryAskService,
    PasswordRecoveryService,
    AgencyPasswordChangeService,
  ],
  imports: [JwtAuthGuard],
})
export class AuthModule {}
