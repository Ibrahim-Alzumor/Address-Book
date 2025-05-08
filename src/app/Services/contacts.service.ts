import {contact} from '../Interfaces/contact.interface';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private storageKey = 'contacts';

  constructor() {
  }

  getContacts(): any [] {
    const contact = localStorage.getItem(this.storageKey);
    return contact ? JSON.parse(contact) : [];
  }

  saveContact(Contact: contact[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(Contact));
  }

  addContact(_contact: contact) {
    const contacts = this.getContacts();
    contacts.push(_contact);
    this.saveContact(contacts)

  }
}

