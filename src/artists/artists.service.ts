import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ILike } from 'typeorm';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(data: any) {
    const artist = this.artistRepository.create({
      id: uuidv4(),
      name: data.name,
      bio: data.bio,
      avatar: data.avatar,
      verified: false,
    });

    return await this.artistRepository.save(artist);
  }

async findAll(
  page = 1,
  limit = 10,
) {
  return this.artistRepository.find({
    relations: {
      songs: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
}

async search(query: string) {
  return this.artistRepository.find({
    where: {
      name: ILike(`%${query}%`),
    },
    relations: {
      songs: true,
    },
  });
}

}