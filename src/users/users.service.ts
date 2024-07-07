import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUser: createUserDTO) {
    try {
      const existingUser = await this.databaseService.user.findUnique({
        where: { email: createUser.email },
      });

      if (existingUser) {
        throw new BadRequestException(
          'User email is already exists. Try another email',
        );
      }

      //Create the user in the database
      return this.databaseService.user.create({
        data: createUser,
      });
    } catch (err) {
      console.error('Error creating user: ', err);

      //Throw a generic error
      if (err instanceof BadRequestException) {
        throw err;
      } else {
        throw new InternalServerErrorException('Error creating user');
      }
    }
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
