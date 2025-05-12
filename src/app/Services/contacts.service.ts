import {contact} from '../Interfaces/contact.interface';
import {Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private url = 'http://localhost:3000/contact';

  constructor(private http: HttpClient) {
  }

  async getContacts(): Promise<contact[]> {
    return await firstValueFrom(
      this.http.get<contact[]>(`${this.url}/`,)
    );
  }

  addContact(Contact: contact): void {
    this.http.post(`${this.url}/add`, Contact).subscribe({
      next: () => console.log('Contact added'),
      error: (error) => console.error('Error adding contact:', error)
    });
  }

  updateContact(updatedContact: contact): void {
    this.http.put(`${this.url}/update`, updatedContact).subscribe({
      next: () => console.log('Contact updated'),
      error: (error) => console.error('Error updating contact:', error)
    });
  }

  deleteContact(ID: contact["ID"]): void {
    this.http.delete(`${this.url}/remove`, {body: {ID}}).subscribe({
      next: () => console.log('Contact Deleted'),
      error: (error) => console.error('Error deleting contact:', error)
    });
  }

}

