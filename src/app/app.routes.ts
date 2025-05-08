import { Routes } from '@angular/router';
import {HomeComponent} from './Contacts/home/home.component';
import {ListComponent} from './Contacts/list/list.component';
import {AddComponent} from './Contacts/add/add.component';
import {LoginComponent} from './Contacts/login/login.component';



export const routes: Routes = [
    {path: '' , component: HomeComponent,},
    {path: 'list', component: ListComponent,},
    {path: 'add', component: AddComponent,},
    {path: 'login', component: LoginComponent,}
];
