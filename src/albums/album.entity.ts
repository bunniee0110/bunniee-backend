import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Song } from '../songs/song.entity';

@Entity('albums')
export class Album {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({
    default: '',
  })
  coverImage: string;

  @Column({
    nullable: true,
  })
  releaseDate: Date;

  @OneToMany(
    () => Song,
    (song) => song.album,
  )
  songs: Song[];
}