import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/presentation/auth.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
