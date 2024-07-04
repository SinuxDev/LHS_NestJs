import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDTO } from './dto/create-user.dto';
import { updateUserDTO } from './dto/update-user.dto';

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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post() // Post/users
  create(@Body(ValidationPipe) createUser: createUserDTO) {
    return this.usersService.create(createUser);
  }

  @Patch(':id') // Patch/users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUser: updateUserDTO,
  ) {
    return this.usersService.update(id, updateUser);
  }

  @Delete(':id') // Delete/users/:id
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
