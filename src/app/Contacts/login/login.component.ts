import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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
        user.email.toLowerCase() === formValue.email.toLowerCase() &&
        user.password === formValue.password
      );

      if (usersFind) {
        this.router.navigate(['/']);
        sessionStorage.setItem('authToken', JSON.stringify(usersFind));
      } else {
        alert('Invalid email or password');
      }
    }
  }


}
