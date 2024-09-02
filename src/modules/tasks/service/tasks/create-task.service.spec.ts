import { PrismaClient, User, Agency, Task, AssignedTask } from '@prisma/client';
import { HttpException } from '@nestjs/common';
import { CreateTaskDto } from '../../dto/tasks/create-task.dto';
import MailerService from '../../../../shared/utils/mails/mail.service';
import { CreateTaskService } from './create-task.service';

jest.mock('../../../../shared/utils/mails/mail.service');

describe('CreateTaskService', () => {
  let prisma: PrismaClient;
  let createTaskService: CreateTaskService;
  let user: User;
  let agency: Agency;
  let createTaskDto: CreateTaskDto;

  beforeEach(() => {
    prisma = new PrismaClient();
    createTaskDto = {
      name: 'Test Task',
      project_id: 'project-id',
      description: 'Test Description',
      task_state_id: 'task-state-id',
      assigned_users_id: ['user-id-1', 'user-id-2'],
      starting_date: Date.now(),
      finishing_date: Date.now() + 1000 * 60 * 60 * 24,
      task_category_id: 'task-category-id',
    };
    user = {
      id: 'user-id',
      email: 'test@example.com',
      agency_id: 'agency-id',
    } as User;
    agency = { id: 'agency-id', name: 'Test Agency' } as Agency;
    createTaskService = new CreateTaskService(
      prisma,
      'test@example.com',
      createTaskDto,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 if user is not found', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(null);

    const result = await createTaskService.createTask();

    expect(result).toBeInstanceOf(HttpException);
    expect((result as HttpException).getStatus()).toBe(404);
    expect((result as HttpException).message).toBe('User not found');
  });

  it('should return 404 if agency is not found', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(user);
    prisma.agency.findUnique = jest.fn().mockResolvedValue(null);

    const result = await createTaskService.createTask();

    expect(result).toBeInstanceOf(HttpException);
    expect((result as HttpException).getStatus()).toBe(404);
    expect((result as HttpException).message).toBe('Agency not found');
  });

  it('should create a task without assigned users successfully', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(user);
    prisma.agency.findUnique = jest.fn().mockResolvedValue(agency);
    prisma.task.create = jest.fn().mockResolvedValue({ id: 'task-id' } as Task);
    createTaskDto.assigned_users_id = [];

    const result = await createTaskService.createTask();

    expect(result).toBe(true);
    expect(prisma.task.create).toHaveBeenCalledWith({
      data: {
        name: createTaskDto.name,
        userId: user.id,
        agencyId: agency.id,
        task_category_id: createTaskDto.task_category_id,
        project_id: createTaskDto.project_id,
      },
    });
  });

  it('should create a task with assigned users successfully and send emails', async () => {
    prisma.user.findUnique = jest
      .fn()
      .mockResolvedValueOnce(user)
      .mockResolvedValueOnce({
        id: 'user-id-1',
        email: 'user1@example.com',
        firstname: 'User1',
      })
      .mockResolvedValueOnce({
        id: 'user-id-2',
        email: 'user2@example.com',
        firstname: 'User2',
      });
    prisma.agency.findUnique = jest.fn().mockResolvedValue(agency);
    prisma.task.create = jest.fn().mockResolvedValue({ id: 'task-id' } as Task);
    prisma.assignedTask.create = jest
      .fn()
      .mockResolvedValue({} as AssignedTask);
    const sendMailMock = jest.fn().mockResolvedValue(true);
    MailerService.prototype.sendMail = sendMailMock;

    const result = await createTaskService.createTask();

    expect(result).toBe(true);
    expect(prisma.task.create).toHaveBeenCalled();
    expect(prisma.assignedTask.create).toHaveBeenCalledTimes(2);
    expect(sendMailMock).toHaveBeenCalledTimes(2);
  });

  it('should handle internal server error', async () => {
    prisma.user.findUnique = jest
      .fn()
      .mockRejectedValue(new Error('Database error'));

    const result = await createTaskService.createTask();

    expect(result).toBeInstanceOf(HttpException);
    expect((result as HttpException).getStatus()).toBe(500);
    expect((result as HttpException).message).toBe('Internal Server Error');
  });
});
