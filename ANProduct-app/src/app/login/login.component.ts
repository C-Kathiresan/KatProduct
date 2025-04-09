import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model = { username: '', password: '' };

  constructor(private auth1: AuthService, private router: Router) {}

  login1() {
    this.auth1.login(this.model).subscribe({
     
     
    });
  }
}
