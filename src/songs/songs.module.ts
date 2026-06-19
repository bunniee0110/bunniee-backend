import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artists/artist.entity';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Song } from './song.entity';
import { Album } from '../albums/album.entity';

import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
  Song,
  Artist,
  Album,
]),
    StorageModule,
  ],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}