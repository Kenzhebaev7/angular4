import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { UserListComponent } from './user-list/user-list-component.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/registration-form', pathMatch: 'full' },
  { path: 'registration-form', component: RegistrationFormComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
