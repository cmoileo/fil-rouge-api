import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from "./dto/update-role.dto";

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

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
}
