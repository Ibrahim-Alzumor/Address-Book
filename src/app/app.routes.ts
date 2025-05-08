import {Routes} from '@angular/router';
import {HomeComponent} from './Contacts/home/home.component';
import {AddComponent} from './Contacts/add/add.component';
import {LoginComponent} from './Contacts/login/login.component';
import {RegisterComponent} from './Contacts/register/register.component';


export const routes: Routes = [
  {path: '', component: LoginComponent,},
  {path: 'add', component: AddComponent,},
  {path: 'home', component: HomeComponent,},
  {path: 'Register', component: RegisterComponent,}
];
