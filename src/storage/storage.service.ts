import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  private supabase;

  constructor(
    private configService: ConfigService,
  ) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_ANON_KEY')!,
    );
  }

  async uploadCover(file: Express.Multer.File) {
  const cleanName = file.originalname.replace(
  /[^a-zA-Z0-9.-]/g,
  '_',
);

const fileName = `${Date.now()}-${cleanName}`;

    const { error } = await this.supabase.storage
      .from('covers')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      return {
        success: false,
        error,
      };
    }

    const { data } = this.supabase.storage
      .from('covers')
      .getPublicUrl(fileName);

    return {
      message: 'Cover uploaded successfully',
      url: data.publicUrl,
    };
  }

  async uploadSong(file: Express.Multer.File) {
const cleanName = file.originalname.replace(
  /[^a-zA-Z0-9.-]/g,
  '_',
);

const fileName = `${Date.now()}-${cleanName}`;

    const { error } = await this.supabase.storage
      .from('songs')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      return {
        success: false,
        error,
      };
    }

    const { data } = this.supabase.storage
      .from('songs')
      .getPublicUrl(fileName);

    return {
      message: 'Song uploaded successfully',
      url: data.publicUrl,
    };
  }
}