import {Routes} from '@angular/router';
import {HomeComponent} from './contacts/home/home.component';
import {AddComponent} from './contacts/add/add.component';
import {LoginComponent} from './contacts/login/login.component';
import {RegisterComponent} from './contacts/register/register.component';
import {AuthGuard} from './services/auth.guard';


export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'add', component: AddComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent,},
  {path: 'register', component: RegisterComponent,}
];
