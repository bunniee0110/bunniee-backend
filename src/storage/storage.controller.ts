import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(
    private storageService: StorageService,
  ) {}

  @Post('upload-cover')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCover(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.storageService.uploadCover(file);
  }

  @Post('upload-song')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSong(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.storageService.uploadSong(file);
  }
}