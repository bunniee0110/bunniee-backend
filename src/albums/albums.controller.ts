import {
  Controller,
  Post,
  Get,
  Body,
  Query,
} from '@nestjs/common';

import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(
    private albumsService: AlbumsService,
  ) {}

  @Post()
  async create(@Body() body: any) {
    return this.albumsService.create(body);
  }

  @Get('search')
async search(
  @Query('q') q: string,
) {
  return this.albumsService.search(q);
}

@Get()
async findAll(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
) {
  return this.albumsService.findAll(
    Number(page),
    Number(limit),
  );
}
}