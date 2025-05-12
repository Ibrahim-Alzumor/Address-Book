import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import {ApiService} from '../../Services/api.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userForm: FormGroup;
  users: any[] = [];

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
}
