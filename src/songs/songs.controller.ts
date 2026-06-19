import {
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Query } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import {
  Param,
} from '@nestjs/common';

import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(
    private songsService: SongsService,
  ) {}

  @Post()
async create(@Body() body: any) {
  return this.songsService.create(body);
}

@Post('create-with-files')
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'cover', maxCount: 1 },
    { name: 'song', maxCount: 1 },
  ]),
)
async createWithFiles(
  @UploadedFiles()
  files: {
    cover?: Express.Multer.File[];
    song?: Express.Multer.File[];
  },
  @Body() body: any,
) {
return this.songsService.createWithFiles(
  body.title,
  Number(body.duration),
  files.cover![0],
  files.song![0],
);
}
@Post(':id/play')
async playSong(
  @Param('id') id: string,
) {
  return this.songsService.playSong(id);
}

@Post(':id/like')
async likeSong(
  @Param('id') id: string,
) {
  return this.songsService.likeSong(id);
}

@Get('top-liked')
async topLikedSongs() {
  return this.songsService.topLikedSongs();
}

@Get('trending')
async getTrendingSongs() {
  return this.songsService.getTrendingSongs();
}

 @Get()
async findAll(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
) {
  return this.songsService.findAll(
    Number(page),
    Number(limit),
  );
}
  @Get('search')
async search(
  @Query('q') q: string,
) {
  return this.songsService.search(q);
}

}