import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Song } from '../songs/song.entity';

@Entity('artists')
export class Artist {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    default: '',
  })
  bio: string;

  @Column({
    default: '',
  })
  avatar: string;

  @Column({
    default: false,
  })
  verified: boolean;

  @OneToMany(
    () => Song,
    (song) => song.artist,
  )
  songs: Song[];
}