import { Component } from '@angular/core';
import { UserService } from './user-service';
import { Router } from "@angular/router";
import {Observable, of} from 'rxjs';  // Import Observable if not already imported

import {ApiService} from "../../api.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.css']
})
export class UserListComponent {
  users: Observable<any[]> | undefined;

  constructor(private userService: UserService, private router: Router, private apiService: ApiService) {}

  private url : string = "http://localhost:3000/user"

  ngOnInit() {
    fetch(this.url)
      .then((response) => response.json())
      .then((data) => {
        this.users = of(data); // Convert the array to an Observable
      });
  }


  editUser(userId: string) {
    this.router.navigate(['/edit-user', userId]);
  }

  deleteUser(userId: string) {
    console.log('Deleting user with ID:', userId);

    this.apiService.deleteUser(userId).subscribe(
      () => {
        this.userService.getUsers()?.subscribe((users) => {
            this.users = of(users as any[]);
            console.log('User deleted successfully');
          },
          (error) => {
            console.error('Error fetching updated user list:', error);
          });
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }




}
