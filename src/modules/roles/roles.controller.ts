import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AssignJobDto } from './dto/assign-job.dto';
import { AssignRoleDto } from './dto/assign-role.dto';

@Controller('jobs')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getRoles(@Req() req: any) {
    const userEmail = req.userEmail;
    return await this.rolesService.getRoles(userEmail);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createRole(@Req() req: any, @Body() body: CreateJobDto) {
    const userEmail = req.userEmail;
    return await this.rolesService.createRole(userEmail, body);
  }

  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  async updateRole(
    @Req() req: any,
    @Body() body: UpdateJobDto,
    @Param('id') roleId: string,
  ) {
    const userEmail = req.userEmail;
    return await this.rolesService.updateRole(userEmail, body, roleId);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteRole(@Param('id') roleId: string) {
    return await this.rolesService.deleteRole(roleId);
  }

  @Post('/employee/assign')
  @UseGuards(JwtAuthGuard)
  async assignJobToEmployee(@Req() req: any, @Body() body: AssignJobDto) {
    const agencyEmail = req.userEmail;
    return await this.rolesService.assignJobToEmployee(agencyEmail, body);
  }
  @Patch('/role/assign')
  @UseGuards(JwtAuthGuard)
  async assignRoleToEmployee(@Req() req: any, @Body() body: AssignRoleDto) {
    const userEmail = req.userEmail;
    return await this.rolesService.assignRoleToEmployee(userEmail, body);
  }

  // @Delete('/employee/remove')
  // @UseGuards(JwtAuthGuard)
  // async removeRoleFromEmployee(@Req() req: any, @Body() body: RemoveJobDto) {
  //   const agencyEmail = req.userEmail;
  //   return await this.rolesService.removeRoleFromEmployee(agencyEmail, body);
  // }
}
