import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../Services/user.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ],
    })
  }

  loginUser(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      const Users = JSON.parse(localStorage.getItem('users') || '[]');


      const usersFind = Users.find((user: any) =>
        user.email === formValue.email && user.password === formValue.password
      );

      if (usersFind) {
        localStorage.setItem('users', JSON.stringify(usersFind));
        this.router.navigate(['/']);
      }
    }
  }

}
