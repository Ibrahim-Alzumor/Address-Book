import {Component, OnInit} from '@angular/core';
import {ContactsService} from '../../Services/contacts.service';
import {contact} from '../../Interfaces/contact.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  contacts: contact[] = [];
  selectedContact: contact | null = null;

  constructor(private contactService: ContactsService) {
  }

  ngOnInit(): void {
    this.loadContacts()
  }

  async loadContacts(): Promise<void> {
    try {
      this.contacts = this.contactService.getContacts();
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
}
