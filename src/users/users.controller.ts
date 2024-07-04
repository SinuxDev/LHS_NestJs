import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // /users
export class UsersController {
  // Dependency injection (DI)
  constructor(private readonly usersService: UsersService) {}

  @Get() // Get/users or /users?role=value
  findAll(@Query('role') role?: 'admin' | 'user' | 'guest') {
    return this.usersService.findAll(role);
  }

  @Get('girlfriends') // Get/users/girlfriends
  findAllGirlfriends() {
    return "Bro, you're not gonna find any here.";
  }

  @Get(':id') // Get/users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post() // Post/users
  create(
    @Body() createUser: { name: string; role: 'admin' | 'guest' | 'user' },
  ) {
    return this.usersService.create(createUser);
  }

  @Patch(':id') // Patch/users/:id
  update(@Param('id') id: string, @Body() updateUser: {}) {
    return this.usersService.update(+id, updateUser);
  }

  @Delete(':id') // Delete/users/:id
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
