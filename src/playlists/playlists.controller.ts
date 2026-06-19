import {
  Controller,
  Post,
  Get,
  Body,
} from '@nestjs/common';

import {
  Param,
} from '@nestjs/common';

import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
  constructor(
    private playlistsService: PlaylistsService,
  ) {}

  @Post()
  async create(@Body() body: any) {
    return this.playlistsService.create(body);
  }

  @Post(':playlistId/songs/:songId')
async addSong(
  @Param('playlistId')
  playlistId: string,

  @Param('songId')
  songId: string,
) {
  return this.playlistsService.addSong(
    playlistId,
    songId,
  );
}

  @Get()
  async findAll() {
    return this.playlistsService.findAll();
  }
}