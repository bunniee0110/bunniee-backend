import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecentlyPlayed } from './recently-played.entity';
import { RecentlyPlayedController } from './recently-played.controller';
import { RecentlyPlayedService } from './recently-played.service';

import { User } from '../users/user.entity';
import { Song } from '../songs/song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecentlyPlayed,
      User,
      Song,
    ]),
  ],
  controllers: [
    RecentlyPlayedController,
  ],
  providers: [
    RecentlyPlayedService,
  ],
})
export class RecentlyPlayedModule {}