import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { FoldersModule } from './modules/folders/folders.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [AuthModule, RolesModule, FoldersModule, ProjectsModule],
})
export class AppModule {}
