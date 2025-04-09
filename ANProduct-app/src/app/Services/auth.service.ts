import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7130/api/AuthController_/login';
  constructor(private http:HttpClient) { }

  login(model: { username: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}`, model).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


}