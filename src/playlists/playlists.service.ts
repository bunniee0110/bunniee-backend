import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Song } from '../songs/song.entity';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,

      @InjectRepository(Song)
  private songRepository: Repository<Song>,
  ) {}

  async create(data: any) {
    const playlist = this.playlistRepository.create({
      id: uuidv4(),
      name: data.name,
    });

    return await this.playlistRepository.save(
      playlist,
    );
  }

  async addSong(
  playlistId: string,
  songId: string,
) {
  const playlist =
    await this.playlistRepository.findOne({
      where: { id: playlistId },
      relations: {
        songs: true,
      },
    });

  if (!playlist) {
    return {
      message: 'Playlist not found',
    };
  }

  const song =
    await this.songRepository.findOne({
      where: { id: songId },
    });

  if (!song) {
    return {
      message: 'Song not found',
    };
  }

  playlist.songs.push(song);

  await this.playlistRepository.save(
    playlist,
  );

  return {
    message:
      'Song added to playlist',
  };
}

  async findAll() {
    return this.playlistRepository.find({
      relations: {
        songs: true,
      },
    });
  }
}