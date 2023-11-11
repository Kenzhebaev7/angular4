import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { UserService } from '../user-list/user-service';
import {ApiService} from "../../api.service";


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  successMessage:any
  errorMessage:any

  user = {
    name: '',
    email: '',
    password: ''
  };


  constructor(private userService: UserService, private router: Router, private apiservice: ApiService) {
  }


  @ViewChild('registrationForm') registrationForm!: NgForm;

  @Output() userRegistered = new EventEmitter<any>();
  registerUser() {
      if (this.registrationForm.valid) {
        console.log(this.user)
        this.userService.addUser(this.user);
        this.router.navigate(['/user-list'])
        this.apiservice.createUser(this.registrationForm.value).subscribe((res)=>{
          console.log(res,'User Created in DB')
          this.registrationForm.reset()
          this.successMessage = res.message
        })
      }
      else{
        this.errorMessage="VALIDATION"
      }
  }
}
