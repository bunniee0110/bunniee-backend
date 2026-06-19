import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RecentlyPlayed } from './recently-played.entity';
import { User } from '../users/user.entity';
import { Song } from '../songs/song.entity';

@Injectable()
export class RecentlyPlayedService {
  constructor(
    @InjectRepository(RecentlyPlayed)
    private recentlyPlayedRepository: Repository<RecentlyPlayed>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  async add(userId: string, songId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const song = await this.songRepository.findOne({
      where: { id: songId },
    });

    if (!user || !song) {
      return {
        message: 'User or Song not found',
      };
    }

    const item = this.recentlyPlayedRepository.create({
      user,
      song,
    });

    return this.recentlyPlayedRepository.save(item);
  }

  async getUserHistory(userId: string) {
    return this.recentlyPlayedRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        song: {
          artist: true,
          album: true,
        },
      },
      order: {
        playedAt: 'DESC',
      },
      take: 20,
    });
  }
}