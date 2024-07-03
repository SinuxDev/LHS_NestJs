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

@Controller('users') // /users
export class UsersController {
  @Get() // Get/users or /users?role=value
  findAll(@Query('role') role?: 'admin' | 'user' | 'guest') {
    return [];
  }

  @Get('girlfriends') // Get/users/girlfriends
  findAllGirlfriends() {
    return "Bro, you're not gonna find any here.";
  }

  @Get(':id') // Get/users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post() // Post/users
  create(@Body() createUser: {}) {
    return createUser;
  }

  @Patch(':id') // Patch/users/:id
  update(@Param('id') id: string, @Body() updateUser: {}) {
    return { id, ...updateUser };
  }

  @Delete(':id') // Delete/users/:id
  remove(@Param('id') id: string) {
    return { id };
  }
}
