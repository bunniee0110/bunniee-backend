import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Song } from '../songs/song.entity';

@Entity('recently_played')
export class RecentlyPlayed {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Song)
  song: Song;

  @CreateDateColumn()
  playedAt: Date;
}