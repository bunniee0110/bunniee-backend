import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import {
  ManyToMany,
} from 'typeorm';

import { Playlist } from '../playlists/playlist.entity';
import { Artist } from '../artists/artist.entity';
import { Album } from '../albums/album.entity';

@Entity('songs')
export class Song {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({
    default: '',
  })
  audioUrl: string;

  @Column({
    default: '',
  })
  coverImage: string;

  @Column({
    default: 0,
  })
  duration: number;

  @Column({
  default: 0,
})
likes: number;

  @Column({
    default: 0,
  })
  playCount: number;

  @ManyToOne(
    () => Artist,
    (artist) => artist.songs,
    {
      nullable: true,
    },
  )
  artist: Artist;

  @ManyToOne(
  () => Album,
  (album) => album.songs,
  {
    nullable: true,
  },
)
album: Album;

@ManyToMany(
  () => Playlist,
  (playlist) => playlist.songs,
)
playlists: Playlist[];

}