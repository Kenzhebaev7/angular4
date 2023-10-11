import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: any[] = [];

  addUser(user: any) {
    this.users.push(user);
  }
  getUsers() {
    return this.users;
  }
  editUser(index: number, newUserDetails: any) {
    if (index >= 0 && index < this.users.length) {
      this.users[index] = newUserDetails;
    }
  }
}
