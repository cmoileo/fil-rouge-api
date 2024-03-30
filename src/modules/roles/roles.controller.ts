import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { CreateRoleDto } from "./dto/create-role.dto";

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createRole(@Req() req: any, @Body() body: CreateRoleDto) {
    const userEmail = req.userEmail;
    return await this.rolesService.createRole(userEmail, body);
  }
}
