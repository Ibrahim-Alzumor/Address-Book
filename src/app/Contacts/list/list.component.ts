import {Component, OnInit} from '@angular/core';
import {contact} from '../../Interfaces/contact.interface';
import {ContactsService} from '../../Services/contacts.service';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  ngOnInit(): void {

  }

}
