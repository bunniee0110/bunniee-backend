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

@Module({
  imports: [
    ConfigModule.forRoot({
  isGlobal: true,
}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Bunniee@123',
      database: 'bunniee',

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
  ],
})
export class AppModule {}