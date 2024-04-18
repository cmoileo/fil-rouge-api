import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import storageService from '../../shared/utils/supabase/storage.service';

@Controller('files')
export class FilesController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return storageService.uploadFile(file);
  }
}
