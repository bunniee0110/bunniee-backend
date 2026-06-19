import { Body, Controller, Post, Param, Get, } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post(':userId/favorites/:songId')
async addFavorite(
  @Param('userId') userId: string,
  @Param('songId') songId: string,
) {
  return this.usersService.addFavorite(
    userId,
    songId,
  );
}

@Get(':userId/favorites')
async getFavorites(
  @Param('userId') userId: string,
) {
  return this.usersService.getFavorites(
    userId,
  );
}

@Get()
async findAll() {
  return this.usersService.findAll();
}

  @Post('register')
  async register(@Body() body: any) {
    return this.usersService.create(body);
  }
}