import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Song } from '../songs/song.entity';

@Entity('playlists')
export class Playlist {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(
    () => Song,
  )
  @JoinTable()
  songs: Song[];
}