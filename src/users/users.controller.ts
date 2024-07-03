import { Controller, Get, Param } from '@nestjs/common';

@Controller('users') // /users
export class UsersController {
  /* 
    Get/users
    Get/users/:id
    Post/users
    Patch/users/:id
    Delete/users/:id
  */

  @Get() // Get/users
  findAll() {
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
}
