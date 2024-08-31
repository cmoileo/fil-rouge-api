import { PrismaClient } from '@prisma/client';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('CreateTaskService (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/tasks (POST) should return 401 if user is not found', async () => {
    const createTaskDto = {
      name: 'Test Task',
      project_id: 'project-id',
      assigned_users_id: [],
    };

    const response = await request(app.getHttpServer())
      .post('/tasks/create')
      .send(createTaskDto)
      .set('Authorization', 'Bearer non-existing-email@example.com');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid token');
  });
});
