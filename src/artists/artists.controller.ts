import {
  Controller,
  Post,
  Get,
  Body,
  Query,
} from '@nestjs/common';

import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(
    private artistsService: ArtistsService,
  ) {}

  @Post()
  async create(@Body() body: any) {
    return this.artistsService.create(body);
  }

  @Get('search')
async search(
  @Query('q') q: string,
) {
  return this.artistsService.search(q);
}

  @Get()
  async findAll() {
    return this.artistsService.findAll();
  }
}