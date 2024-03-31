import { Controller, Post, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { JwtAuthGuard } from '../guards/verify-jwt.guard';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {
  }
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createFolder() {
    return await this.foldersService.createFolder();
  }
}
