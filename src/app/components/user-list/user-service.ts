import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: Observable<any[]> | undefined;

  constructor(private apiService: ApiService) {}

  addUser(user: any) {
    if (this.users) {
      this.users = this.users.pipe(
        map((existingUsers) => [...existingUsers, user])
      );
    }
  }

  getUsers(): Observable<any[]> | undefined {
    return this.users;
  }

  editUser(index: number, newUserDetails: any) {
    console.log('Temporary edit method without updating the list');
  }

}
