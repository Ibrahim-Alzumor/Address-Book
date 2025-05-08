import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from '../../navbar/navbar.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
}
