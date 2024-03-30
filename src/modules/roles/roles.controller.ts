import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignRoleDto } from "./dto/assign-role.dto";
import { RemoveRoleDto } from "./dto/remove-role.dto";

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getRoles(@Req() req: any) {
    const userEmail = req.userEmail;
    return await this.rolesService.getRoles(userEmail);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createRole(@Req() req: any, @Body() body: CreateRoleDto) {
    const userEmail = req.userEmail;
    return await this.rolesService.createRole(userEmail, body);
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  async updateRole(@Req() req: any, @Body() body: UpdateRoleDto) {
    const userEmail = req.userEmail;
    return await this.rolesService.updateRole(userEmail, body);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteRole(@Param('id') roleId: string) {
    return await this.rolesService.deleteRole(roleId);
  }

  @Post('/employee/assign')
  @UseGuards(JwtAuthGuard)
  async assignRoleToEmployee(@Req() req: any, @Body() body: AssignRoleDto) {
    const agencyEmail = req.userEmail;
    return await this.rolesService.assignRoleToEmployee(agencyEmail, body);
  }

  @Delete('/employee/remove')
  @UseGuards(JwtAuthGuard)
  async removeRoleFromEmployee(@Req() req: any, @Body() body: RemoveRoleDto) {
    const agencyEmail = req.userEmail;
    return await this.rolesService.removeRoleFromEmployee(agencyEmail, body);
  }
}
