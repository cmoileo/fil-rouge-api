import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { CreateFolderDto } from './dto/create-folder.dto';
import { DeleteFolderDto } from './dto/delete-folder.dto';

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
}
