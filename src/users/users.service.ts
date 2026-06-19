import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { Song } from '../songs/song.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Song)
private songRepository: Repository<Song>,
  ) {}

  async addFavorite(
  userId: string,
  songId: string,
) {
  const user = await this.userRepository.findOne({
    where: { id: userId },
    relations: {
      favoriteSongs: true,
    },
  });

  if (!user) {
    return {
      message: 'User not found',
    };
  }

  const song = await this.songRepository.findOne({
    where: { id: songId },
  });

  if (!song) {
    return {
      message: 'Song not found',
    };
  }

  user.favoriteSongs.push(song);

  await this.userRepository.save(user);

  return {
    message: 'Added to favorites',
  };
}

async getFavorites(
  userId: string,
) {
  const user = await this.userRepository.findOne({
    where: { id: userId },
    relations: {
      favoriteSongs: {
        artist: true,
        album: true,
      },
    },
  });

  if (!user) {
    return {
      message: 'User not found',
    };
  }

  return user.favoriteSongs;
}

async findAll() {
  return this.userRepository.find();
}

async create(userData: any) {
  const existingUser = await this.userRepository.findOne({
    where: { email: userData.email },
  });

  if (existingUser) {
    return {
      message: 'Email already exists',
    };
  }

  const hashedPassword = await bcrypt.hash(
    userData.password,
    10,
  );

  const user = this.userRepository.create({
    id: uuidv4(),
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
  });

  await this.userRepository.save(user);

  return {
    message: 'User created successfully',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
}

}