import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { FoldersService } from './folders.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { CreateFolderDto } from './dto/create-folder.dto';
import { DeleteFolderDto } from './dto/delete-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createFolder(@Req() req: any, @Body() body: CreateFolderDto) {
    const agency_email = req.userEmail;
    return await this.foldersService.createFolder(agency_email, body);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  async deleteFolder(@Req() req: any, @Body() body: DeleteFolderDto) {
    const agency_email = req.userEmail;
    return await this.foldersService.deleteFolder(agency_email, body);
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  async updateFolder(@Req() req: any, @Body() body: UpdateFolderDto) {
    const agency_email = req.userEmail;
    return await this.foldersService.updateFolder(agency_email, body);
  }

  @Get('/get')
  @UseGuards(JwtAuthGuard)
  async getFolders(@Req() req: any) {
    const agency_email = req.userEmail;
    return await this.foldersService.getFolders(agency_email);
  }
}
