import {
  Controller,
  Post,
  Get,
  Param,
} from '@nestjs/common';

import { RecentlyPlayedService } from './recently-played.service';

@Controller('recently-played')
export class RecentlyPlayedController {
  constructor(
    private recentlyPlayedService: RecentlyPlayedService,
  ) {}

  @Post(':userId/:songId')
  async add(
    @Param('userId') userId: string,
    @Param('songId') songId: string,
  ) {
    return this.recentlyPlayedService.add(
      userId,
      songId,
    );
  }

  @Get(':userId')
  async getHistory(
    @Param('userId') userId: string,
  ) {
    return this.recentlyPlayedService.getUserHistory(
      userId,
    );
  }
}