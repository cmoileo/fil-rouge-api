import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';
import { CreateFolderDto } from './dto/create-folder.dto';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createFolder(@Req() req: any, @Body() body: CreateFolderDto) {
    const agency_email = req.userEmail;
    return await this.foldersService.createFolder(agency_email, body);
  }
}
