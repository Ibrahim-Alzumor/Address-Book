import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
import {contact} from '../../interfaces/contact.interface';
import {FormsModule} from '@angular/forms';
import {ContactEditor} from '../../services/contactEditor';
import {Router, RouterLink} from '@angular/router';
import {ContactEditorService} from '../../services/contact-editor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrl: './home.component.css'
})
export class HomeComponent extends ContactEditor implements OnInit {

  selectedContact: contact | null = null;

  constructor(contactService: ContactsService, private contactEditorService: ContactEditorService, private router: Router, cd: ChangeDetectorRef) {
    super(contactService, cd);
  }

  ngOnInit(): void {
    this.loadContacts()
  }


  openContactModal(contact: contact): void {
    this.selectedContact = contact;
  }

  closeModal(): void {
    this.selectedContact = null;
  }

  override editContact(contact: contact): void {
    this.contactEditorService.setContact(contact);
    this.router.navigate(['/add']);
  }


  async deleteContact(id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id);
      this.loadContacts();
    }
  }
}
