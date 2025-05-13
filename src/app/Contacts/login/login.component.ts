import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {ApiService} from '../../services/api.service';

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
  credentials = {email: '', password: ''};

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {
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

  login(): void {
    this.credentials = {email: this.userForm.value.email, password: this.userForm.value.password};
    this.apiService.loginUser(this.credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['']).then(() => {
          console.log('Navigation successful.');
        });
      },
      error: (error: any) => {
        console.error('Login failed:', error);
      },
    });
  }
}
