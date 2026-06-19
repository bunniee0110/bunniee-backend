import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';
import { AlbumsModule } from './albums/albums.module';
import { StorageModule } from './storage/storage.module';
import { ConfigModule } from '@nestjs/config';
import { PlaylistsModule } from './playlists/playlists.module';
import { RecentlyPlayedModule } from './recently-played/recently-played.module';

@Module({
  imports: [
    ConfigModule.forRoot({
  isGlobal: true,
}),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,

      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ArtistsModule,
    SongsModule,
    AlbumsModule,
    StorageModule,
    PlaylistsModule,
    RecentlyPlayedModule,
  ],
})
export class AppModule {}