import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ApiService} from '../services/api.service';
import {ContactEditorService} from '../services/contact-editor.service';


@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private apiService: ApiService, private contactEditorService: ContactEditorService) {
  }

  onLogout() {
    this.router.navigate(['/login']);
    this.apiService.clearToken()
  }

  addingContact() {
    this.router.navigate(['/add']);
    this.contactEditorService.clear();
  }
}
