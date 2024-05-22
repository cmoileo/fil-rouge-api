import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { FoldersModule } from './modules/folders/folders.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AccountModule } from './modules/account/account.module';
import { MulterModule } from '@nestjs/platform-express';
import { TaskCategoriesModule } from './modules/task-categories/task-categories.module';

@Module({
  imports: [
    AuthModule,
    RolesModule,
    FoldersModule,
    ProjectsModule,
    TasksModule,
    AccountModule,
    MulterModule.register({
      dest: './uploads',
    }),
    TaskCategoriesModule,
  ],
})
export class AppModule {}
