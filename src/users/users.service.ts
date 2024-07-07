import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUser: createUserDTO) {
    return this.databaseService.user.create({
      data: createUser,
    });
  }

  async findAll(role?: 'admin' | 'user' | 'guest') {
    if (!role) {
      return this.databaseService.user.findMany();
    }

    return this.databaseService.user.findMany({
      where: {
        role,
      },
    });
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('User not found');
    }

    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUser: Prisma.UserUpdateInput) {
    if (!id) {
      throw new Error('User not found');
    }

    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUser,
    });
  }

  async remove(id: number) {
    if (!id) {
      throw new Error('User not found');
    }

    return this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
