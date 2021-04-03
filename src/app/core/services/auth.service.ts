import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host: string = environment.host;
  constructor(private http: HttpClient) {}

  logIn(loginForm): Observable<any> {
    return this.http.post(this.host + 'v1/auth/login', {
      username: loginForm.username,
      password: loginForm.password,
    });
  }

  isLoggedIn() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.clear();
  }

  setToken(value: string) {
    localStorage.setItem('access_token', value);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  removeToken() {
    localStorage.removeItem('access_token');
  }
}
