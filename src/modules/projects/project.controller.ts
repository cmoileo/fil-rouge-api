import {
  Body,
  Controller,
  HttpException, Patch,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { CreateProjectDto } from './dto/create-project.dto';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('/create')
  async createProject(
    @Req() req: any,
    @Body() body: CreateProjectDto,
  ): Promise<boolean | HttpException> {
    const agency_email = req.userEmail;
    return this.projectService.createProject(agency_email, body);
  }
  @Patch('/update/:id')
  async updateProject(
    @Req() req: any,
    @Body() body: CreateProjectDto,
  ): Promise<boolean | HttpException> {
    const agency_email = req.userEmail;
    const project_id = req.params.id;
    return this.projectService.updateProject(agency_email, body, project_id);
  }
}
