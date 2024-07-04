import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { updateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Jane Doe',
      role: 'user',
    },
    {
      id: 3,
      name: 'Jim Doe',
      role: 'guest',
    },
    {
      id: 4,
      name: 'Jill Doe',
      role: 'admin',
    },
  ];

  findAll(role?: 'admin' | 'guest' | 'user') {
    if (role) {
      const rolesArr = this.users.filter((user) => user.role === role);

      if (!rolesArr || rolesArr.length === 0) {
        throw new NotFoundException(`Users with role ${role} not found`);
      }

      return rolesArr;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  create(user: createUserDTO) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)[0];
    const newUser = {
      id: userByHighestId.id + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUser: updateUserDTO) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUser,
        };
      }
      return user;
    });

    return this.findOne(id);
  }

  remove(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
