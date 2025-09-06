import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
  ];

  // Tüm kullanıcıları getir
  findAll(): User[] {
    return this.users;
  }

  // Tek bir kullanıcı getir (bulunamazsa undefined döner)
  findOne(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  // Yeni kullanıcı ekle
  create(user: User): User {
    this.users.push(user);
    return user;
  }

  // Kullanıcıyı güncelle
  update(id: number, user: Partial<User>): User | null {
    const index = this.users.findIndex((u) => u.id === id);
    if (index >= 0) {
      this.users[index] = { ...this.users[index], ...user };
      return this.users[index];
    }
    return null;
  }

  // Kullanıcıyı sil
  delete(id: number): { deleted: boolean } {
    this.users = this.users.filter((u) => u.id !== id);
    return { deleted: true };
  }
}
