import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Playlist } from './playlist.entity';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { Song } from '../songs/song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Playlist,
      Song,
    ]),
  ],
  controllers: [
    PlaylistsController,
  ],
  providers: [
    PlaylistsService,
  ],
})
export class PlaylistsModule {}