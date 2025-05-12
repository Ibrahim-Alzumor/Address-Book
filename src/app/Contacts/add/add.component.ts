import {Component} from '@angular/core';
import {contact} from '../../Interfaces/contact.interface';
import {ContactsService} from '../../Services/contacts.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-add',
  imports: [
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  contactForm: FormGroup;
  contacts: any[] = [];

  constructor(private fb: FormBuilder, private contactsService: ContactsService) {
    this.contactForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z\s]+$/),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z\s]+$/),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        ],
      ],
      phone: [
        '',
        [
          Validators.minLength(10),
          Validators.pattern(/^\+?[1-9]\d{1,14}$/),
        ],
      ],
      landline: [
        '',
        [
          Validators.minLength(8),
          Validators.pattern(/^\+?[1-9]\d{1,14}$/),
        ],
      ],
      fax: [
        '',
        [
          Validators.minLength(10),
          Validators.pattern(/^fax?\d{10,14}$/),
        ],
      ],
      job_title: [
        '',
        [
          Validators.required,
        ],
      ],
      company: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }

  async addContact(): Promise<any> {
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;

      const newContact: contact = {
        ID: new Date().getTime(),
        job_title: formValue.job_title,
        company: formValue.company,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        landline: formValue.landline,
        fax: formValue.fax,
      };

      this.contactsService.addContact(newContact);
      this.contactForm.reset();
    }
  }
}
