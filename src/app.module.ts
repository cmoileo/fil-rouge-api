import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { FoldersModule } from './modules/folders/folders.module';

@Module({
  imports: [AuthModule, RolesModule, FoldersModule],
})
export class AppModule {}
