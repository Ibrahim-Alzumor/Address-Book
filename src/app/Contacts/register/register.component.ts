import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {ApiService} from '../../services/api.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userForm: FormGroup;

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
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ],
      ],
    })
  }

  register() {
    if (this.userForm.valid) {
      this.apiService.registerUser(this.userForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['']).then(() => {
            console.log('Navigation successful.');
          });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
    }
  }

  get emailErrorMessage(): string | null {
    const emailControl = this.userForm.controls['email'];
    if (emailControl.touched && emailControl.invalid) {
      if (emailControl.errors?.['required']) {
        return 'Email is required';
      }
      if (emailControl.errors?.['email']) {
        return 'Please enter a valid email';
      }
      if (emailControl.errors?.['pattern']) {
        return 'Invalid email format. Please use a valid format like example@domain.com';
      }
    }
    return null;
  }

  get passwordErrorMessage(): string | null {
    const passwordControl = this.userForm.controls['password'];
    if (passwordControl.touched && passwordControl.invalid) {
      if (passwordControl.errors?.['required']) {
        return 'Password is required';
      }
      if (passwordControl.errors?.['minlength']) {
        return 'Password must be at least 8 characters';
      }
      if (passwordControl.errors?.['pattern']) {
        return 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.';
      }
    }
    return null;
  }
}
