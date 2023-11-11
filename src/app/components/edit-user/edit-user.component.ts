import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any = {};
  userId: string;
  error: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.apiService.getUser(this.userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        this.error = 'Ayan Gay';
      }
    );
  }

  onSubmit() {
    this.apiService.updateUser(this.userId, this.user).subscribe(
      (updatedUser) => {
        // Update the user data on the client-side if needed
        this.user = updatedUser;
        this.router.navigate(['/user-list']);
      },
      (error) => {
        this.error = 'Error updating user: ' + error.message;
      }
    );
  }
}
