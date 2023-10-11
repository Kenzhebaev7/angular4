import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user-list/user-service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any;
  index: number = -1;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.index = +id;
      this.user = this.userService.getUsers()[this.index];
    } else {}
  }

  saveChanges() {
    this.userService.editUser(this.index, this.user);
    this.router.navigate(['/user-list']);
  }
}
