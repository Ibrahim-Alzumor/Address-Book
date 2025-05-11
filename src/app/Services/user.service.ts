import {Injectable} from '@angular/core';
import {user} from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'users';

  constructor() {
  }

  getUsers(): any [] {
    const user = localStorage.getItem(this.storageKey);
    return user ? JSON.parse(user) : [];
  }

  saveUser(User: user[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(User));
  }

  addUser(User: user) {
    const users: any[] = this.getUsers();
    users.push(User);
    this.saveUser(users);
  }
}
