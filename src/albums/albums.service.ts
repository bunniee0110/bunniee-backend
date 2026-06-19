import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ILike } from 'typeorm';
import { Album } from './album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(data: any) {
    const album = this.albumRepository.create({
      id: uuidv4(),
      title: data.title,
      coverImage: data.coverImage,
      releaseDate: data.releaseDate,
    });

    return await this.albumRepository.save(album);
  }

 async findAll(
  page = 1,
  limit = 10,
) {
  return this.albumRepository.find({
    relations: {
      songs: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
}

  async search(query: string) {
    return this.albumRepository.find({
      where: {
        title: ILike(`%${query}%`),
      },
        relations: {
      songs: true,
    },
    });
  }
}