import { Injectable } from '@nestjs/common';

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
      return this.users.filter((user) => user.role === role);
    } else {
      return this.users;
    }
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  create(user: { name: string; role: 'admin' | 'guest' | 'user' }) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)[0];
    const newUser = {
      id: userByHighestId.id + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updateUser: { name?: string; role?: 'admin' | 'guest' | 'user' },
  ) {
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
