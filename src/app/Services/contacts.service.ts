import {contact} from '../Interfaces/contact.interface';
import {Injectable} from '@angular/core';
import {firstValueFrom, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from './enviroment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private url = `${environment.apiUrl}/contact`;

  constructor(private http: HttpClient) {
  }

  private getAuthHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('authToken');
    return {Authorization: `Bearer ${token}`};
  }

  async getContacts(): Promise<contact[]> {
    return await firstValueFrom(
      this.http.get<contact[]>(`${environment.apiUrl}/contact/`)
    );
  }

  async getContactById(id: number): Promise<contact> {
    return await firstValueFrom(this.http.get<contact>(`${this.url}/${id}`));
  }

  addContact(Contact: contact): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = token
      ? new HttpHeaders({Authorization: `Bearer ${token}`})
      : new HttpHeaders();

    return this.http.post(`${this.url}/add`, Contact, {headers});
  }

  updateContact(updatedContact: contact): void {
    this.http.put(`${this.url}/update`, {
      ID: updatedContact.ID,
      job_title: updatedContact.job_title,
      email: updatedContact.email,
      firstName: updatedContact.firstName,
      lastName: updatedContact.lastName,
      company: updatedContact.company,
      phone: updatedContact.phone,
      landline: updatedContact.landline,
      fax: updatedContact.fax,
    }, {
      headers: this.getAuthHeaders(),
    }).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error('Error updating cart item:', error);
      },
    });
  }

  deleteContact(contactId: number): void {
    console.log(contactId);
    this.http.delete(`${this.url}/remove`, {
      headers: this.getAuthHeaders(),
      body: {contactId},
    }).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
      },
    });
  }


}

