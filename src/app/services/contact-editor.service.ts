import {Injectable} from '@angular/core';
import {contact} from '../interfaces/contact.interface';

@Injectable({providedIn: 'root'})
export class ContactEditorService {
  public contactToEdit: contact | null = null;
  public camelId: number = 0;

  setContact(contact: contact): void {
    this.contactToEdit = {...contact};
    this.camelId = this.contactToEdit.ID;
  }

  getContact(): contact | null {
    return this.contactToEdit;
  }

  clear(): void {
    this.contactToEdit = null;
  }
}
