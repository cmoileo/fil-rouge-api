import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [AuthModule, RolesModule],
})
export class AppModule {}
