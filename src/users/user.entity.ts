import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ManyToMany, JoinTable } from 'typeorm';
import { Song } from '../songs/song.entity';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Song)
@JoinTable()
favoriteSongs: Song[];

}