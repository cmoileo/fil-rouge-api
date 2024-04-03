import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { FoldersModule } from './modules/folders/folders.module';
import { CoModule } from './s/co/co.module';
import { ProjectModule } from './modukes/projects/projects.module';
import { ProjectModule } from './modules/projects/project.module';

@Module({
  imports: [AuthModule, RolesModule, FoldersModule, CoModule, ProjectModule],
})
export class AppModule {}
