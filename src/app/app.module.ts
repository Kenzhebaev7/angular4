import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { UserListComponent } from './components/user-list/user-list-component.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./components/user-list/user-service";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    UserListComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }


