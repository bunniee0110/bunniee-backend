import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../artists/artist.entity';
import { StorageService } from '../storage/storage.service';
import { Song } from './song.entity';
import { Album } from '../albums/album.entity';
import { ILike } from 'typeorm';

@Injectable()
export class SongsService {
 constructor(
  @InjectRepository(Song)
  private songRepository: Repository<Song>,

  @InjectRepository(Artist)
  private artistRepository: Repository<Artist>,

@InjectRepository(Album)
private albumRepository: Repository<Album>,
  
  private storageService: StorageService,
) {}

async create(data: any) {
  const artist = await this.artistRepository.findOne({
    where: {
      id: data.artistId,
    },
  });

  if (!artist) {
    return {
      message: 'Artist not found',
    };
  }

let album: Album | null = null;
  if (data.albumId) {
    album = await this.albumRepository.findOne({
      where: {
        id: data.albumId,
      },
    });
  }

  const song = this.songRepository.create({
    id: uuidv4(),
    title: data.title,
    audioUrl: data.audioUrl,
    coverImage: data.coverImage,
    duration: data.duration,
    playCount: 0,
    artist,
    album: album ?? undefined,
  });

  return await this.songRepository.save(song);
}

async search(query: string) {
  return this.songRepository.find({
    where: {
      title: ILike(`%${query}%`),
    },
    relations: {
      artist: true,
      album: true,
    },
  });
}

  async createWithFiles(
    title: string,
    duration: number,
    coverFile: Express.Multer.File,
    songFile: Express.Multer.File,
  ) {
    const coverUpload =
      await this.storageService.uploadCover(coverFile);

    const songUpload =
      await this.storageService.uploadSong(songFile);

    const song = this.songRepository.create({
      id: uuidv4(),
      title,
      audioUrl: songUpload.url,
      coverImage: coverUpload.url,
      duration,
      playCount: 0,
    });

    return await this.songRepository.save(song);
  }
  
  async playSong(id: string) {
  const song = await this.songRepository.findOne({
    where: { id },
  });

  if (!song) {
    return {
      message: 'Song not found',
    };
  }

  song.playCount += 1;

  await this.songRepository.save(song);

  return {
    message: 'Play count updated',
    playCount: song.playCount,
  };
}

async getTrendingSongs() {
  return this.songRepository.find({
    order: {
      playCount: 'DESC',
    },
    take: 10,
    relations: {
      artist: true,
      album: true,
    },
  });
}

async likeSong(id: string) {
  const song = await this.songRepository.findOne({
    where: { id },
  });

  if (!song) {
    return {
      message: 'Song not found',
    };
  }

  song.likes += 1;

  await this.songRepository.save(song);

  return {
    message: 'Song liked',
    likes: song.likes,
  };
}

async topLikedSongs() {
  return this.songRepository.find({
    order: {
      likes: 'DESC',
    },
    take: 10,
    relations: {
      artist: true,
      album: true,
    },
  });
}

async findAll(
  page = 1,
  limit = 10,
) {
  const [songs, total] =
    await this.songRepository.findAndCount({
      relations: {
        artist: true,
        album: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

  return {
    data: songs,
    total,
    page,
    limit,
    totalPages: Math.ceil(
      total / limit,
    ),
  };
}
}