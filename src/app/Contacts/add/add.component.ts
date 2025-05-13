import {ChangeDetectorRef, Component} from '@angular/core';
import {contact} from '../../interfaces/contact.interface';
import {ContactsService} from '../../services/contacts.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {ContactEditor} from '../../services/contactEditor';
import {Router} from '@angular/router';
import {ContactEditorService} from '../../services/contact-editor.service';

@Component({
  selector: 'app-add',
  imports: [
    NgClass,
    ReactiveFormsModule,
    NgIf,
    FormsModule,

  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent extends ContactEditor {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactEditorService: ContactEditorService, contactsService: ContactsService, private router: Router, cd: ChangeDetectorRef) {
    super(contactsService, cd);
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
      jobTitle: [
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

    const contactToEdit = this.contactEditorService.getContact();
    if (contactToEdit) {
      this.editContacts = contactToEdit;
      this.contactForm.patchValue(contactToEdit);
    }
  }


  async addContact(): Promise<any> {
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;

      const newContact: contact = {
        ID: new Date().getTime(),
        jobTitle: formValue.jobTitle,
        company: formValue.company,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        landline: formValue.landline,
        fax: formValue.fax,
      };

      this.contactService.addContact(newContact);
      this.contactForm.reset();
      this.router.navigate(['/']);
      this.loadContacts();
    }
  }

  saveEditedContact(): void {
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;

      const updatedContact: contact = {
        ID: this.contactEditorService.camelId,
        jobTitle: formValue.jobTitle,
        company: formValue.company,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        landline: formValue.landline,
        fax: formValue.fax,
      }
      this.contactService.updateContact(updatedContact);
      this.editContacts = null;
      this.router.navigate(['/']);
      this.loadContacts();
    }
  }


  get emailErrorMessage(): string | null {
    const emailControl = this.contactForm.controls['email'];
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

  get firstNameErrorMessage(): string | null {
    const firstNameControl = this.contactForm.controls['firstName'];
    if (firstNameControl.touched && firstNameControl.invalid) {
      if (firstNameControl.errors?.['required']) {
        return 'First Name is required';
      }
      if (firstNameControl.errors?.['minlength']) {
        return 'First Name must be at least 3 characters long';
      }
      if (firstNameControl.errors?.['pattern']) {
        return 'First Name must only contain letters';
      }
    }
    return null;
  }

  get lastNameErrorMessage(): string | null {
    const lastNameControl = this.contactForm.controls['lastName'];
    if (lastNameControl.touched && lastNameControl.invalid) {
      if (lastNameControl.errors?.['required']) {
        return 'Last Name is required';
      }
      if (lastNameControl.errors?.['minlength']) {
        return 'Last Name must be at least 3 characters long';
      }
      if (lastNameControl.errors?.['pattern']) {
        return 'Last Name must only contain letters';
      }
    }
    return null;
  }

  get jobTitleErrorMessage(): string | null {
    const jobTitleControl = this.contactForm.controls['jobTitle'];
    if (jobTitleControl.touched && jobTitleControl.invalid) {
      if (jobTitleControl.errors?.['required']) {
        return 'Job Title is required';
      }
    }
    return null;
  }

  get companyErrorMessage(): string | null {
    const companyControl = this.contactForm.controls['company'];
    if (companyControl.touched && companyControl.invalid) {
      if (companyControl.errors?.['required']) {
        return 'Company Name is required';
      }
    }
    return null;
  }

  get phoneErrorMessage(): string | null {
    const phoneControl = this.contactForm.controls['phone'];
    if (phoneControl.touched && phoneControl.invalid) {
      if (phoneControl.errors?.['minlength']) {
        return 'Phone Number must be at least 10 digits';
      }
      if (phoneControl.errors?.['pattern']) {
        return 'Invalid phone number format. Please use a valid format like +123-45-678-9000 or 123-456-7890';
      }
    }
    return null;
  }

  get landlineErrorMessage(): string | null {
    const landlineControl = this.contactForm.controls['landline'];
    if (landlineControl.touched && landlineControl.invalid) {
      if (landlineControl.errors?.['minlength']) {
        return 'Landline Number must be at least 8 digits';
      }
      if (landlineControl.errors?.['pattern']) {
        return 'Invalid Landline number format. Please use a valid international format like +1234567890';
      }
    }
    return null;
  }

  get faxErrorMessage(): string | null {
    const faxControl = this.contactForm.controls['fax'];
    if (faxControl.touched && faxControl.invalid) {
      if (faxControl.errors?.['minlength']) {
        return 'Fax Number must be at least 8 digits';
      }
      if (faxControl.errors?.['pattern']) {
        return 'Invalid fax number format. Please use a format like fax1234567890';
      }
    }
    return null;
  }


}
