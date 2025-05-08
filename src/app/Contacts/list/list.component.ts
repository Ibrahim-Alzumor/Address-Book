import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../../navbar/navbar.component';

@Component({
  selector: 'app-list',
  imports: [
    NavbarComponent,

  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  ngOnInit(): void {

  }

}
