import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { UserService } from '../user-list/user-service';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {
  }


  @ViewChild('registrationForm') registrationForm!: NgForm;

  @Output() userRegistered = new EventEmitter<any>();
  registerUser() {
      if (this.registrationForm.valid) {
        console.log(this.user)
        this.userService.addUser(this.user);
        this.router.navigate(['/user-list'])
      }
  }
}
