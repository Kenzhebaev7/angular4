import { Component } from '@angular/core';
import { UserService } from './user-service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.css']
})
export class UserListComponent {
  users: any[] = [];

    constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }
   editUser(index: number) {
    this.router.navigate(['/edit-user', index]);
  }


}
