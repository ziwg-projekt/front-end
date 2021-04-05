import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital';
import { User } from '../models/user';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host: string = environment.host;

  constructor(private http: HttpClient, private userService: UsersService) {}

  logIn(loginForm): Observable<any> {
    return this.http
      .post<any>(this.host + 'v1/auth/login', {
        username: loginForm.username,
        password: loginForm.password,
      })
      .pipe(
        map((data) => {
          if (data && data.access_token) {
            this.setToken(data.access_token);
            this.setUserId(data.user_id);
          }
          return data;
        })
      );
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

  setUserId(value: string) {
    localStorage.setItem('user_id', value);
  }

  get userId(): number {
    return parseInt(localStorage.getItem('user_id'));
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  removeToken() {
    localStorage.removeItem('access_token');
  }
}
