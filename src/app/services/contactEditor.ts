import {contact} from '../interfaces/contact.interface';
import {ContactsService} from './contacts.service';
import {ChangeDetectorRef} from '@angular/core';

export abstract class ContactEditor {
  editContacts: contact | null = null;
  contacts: contact[] = [];

  protected constructor(protected contactService: ContactsService, private cd: ChangeDetectorRef) {
  }

  editContact(contact: contact): void {
    this.editContacts = {...contact};
  }

  async loadContacts(): Promise<void> {
    try {
      this.contacts = await this.contactService.getContacts();
      this.cd.detectChanges();
    } catch (error) {
      console.error('Failed to load contacts', error);
    }
  }

}
