import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {user} from '../../Interfaces/user.interface';
import {UserService} from '../../Services/user.service';
import {NgClass} from '@angular/common';

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

  constructor(private fb: FormBuilder, private userService: UserService,) {
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

  addUser() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      const newUser: user = {
        email: formValue.email,
        password: formValue.password,
      };
      this.userService.addUser(newUser)
      this.users = this.userService.getUsers();
      this.userForm.reset();
    }
  }
}
