import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ApiService} from '../Services/api.service';


@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private apiService: ApiService) {
  }

  onLogout() {
    this.router.navigate(['/Login']);
    this.apiService.clearToken()
  }
}
