import {Component, OnInit} from '@angular/core';
import {ContactsService} from '../../Services/contacts.service';
import {contact} from '../../Interfaces/contact.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  contacts: contact[] = [];
  selectedContact: contact | null = null;
  editContacts: contact | null = null;

  constructor(private contactService: ContactsService) {
  }

  ngOnInit(): void {
    this.loadContacts()
  }

  async loadContacts(): Promise<void> {
    try {
      this.contacts = await this.contactService.getContacts();
    } catch (error) {
      console.error('Failed to load contacts', error);
    }
  }

  openContactModal(contact: contact): void {
    this.selectedContact = contact;
  }

  closeModal(): void {
    this.selectedContact = null;
  }

  closeEditContactModal(): void {
    this.editContacts = null;
  }

  editContact(contact: contact): void {
    this.editContacts = {...contact};
  }

  saveEditedContact(): void {
    if (this.editContacts) {
      this.contactService.updateContact(this.editContacts);
      this.contactService.getContacts();
      this.loadContacts()
      this.closeEditContactModal();
    }
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id);
      this.contactService.getContacts();
      this.loadContacts()
    }
  }
}
