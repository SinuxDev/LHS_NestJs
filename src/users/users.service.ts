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
    try {
      const validateRoles = ['admin', 'user', 'guest'];

      if (role && !validateRoles.includes(role)) {
        throw new NotFoundException("Can't Found that roles");
      }

      const whereConditionForRole = role ? { role } : {};

      const userDocs = await this.databaseService.user.findMany({
        where: whereConditionForRole,
        select: {
          name: true,
          email: true,
          role: true,
        },
      });

      if (!userDocs) {
        throw new NotFoundException("There's nothing I means users...");
      }

      return {
        message: 'All Users Fetched Successfully',
        userDocs,
      };
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      } else {
        throw new InternalServerErrorException('Error finding user');
      }
    }
  }

  async update(id: number, updateUser: Prisma.UserUpdateInput) {
    try {
      // Check if the user exists
      const existingUser = await this.databaseService.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      // Update the user
      const updatedUser = await this.databaseService.user.update({
        where: { id },
        data: updateUser,
      });

      // Return success message along with the updated user data
      return {
        message: 'Update Successful',
        user: updatedUser,
      };
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      } else {
        throw new InternalServerErrorException('Error updating user');
      }
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.databaseService.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException('User Not Found');
      }

      return this.databaseService.user.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      } else {
        throw new InternalServerErrorException('Error removing user');
      }
    }
  }
}
