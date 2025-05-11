import {Routes} from '@angular/router';
import {HomeComponent} from './Contacts/home/home.component';
import {AddComponent} from './Contacts/add/add.component';
import {LoginComponent} from './Contacts/login/login.component';
import {RegisterComponent} from './Contacts/register/register.component';
import {AuthGuard} from './auth.guard';


export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'Add', component: AddComponent, canActivate: [AuthGuard]},
  {path: 'Login', component: LoginComponent,},
  {path: 'Register', component: RegisterComponent,}
];
