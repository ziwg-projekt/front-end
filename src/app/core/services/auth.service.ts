import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Authority } from '../enums/authority.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host: string = environment.host;

  constructor(private http: HttpClient) {}

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
            if (this.checkRole(data.authorities, Authority.Admin)) {
              this.setUserRole(Authority.Admin);
            } else if (this.checkRole(data.authorities, Authority.Hospital)) {
              this.setUserRole(Authority.Hospital);
            } else {
              this.setUserRole(Authority.Citizen);
            }
          }
          return data;
        })
      );
  }
  checkRole(authorities, role:Authority) {
    return authorities.some((a) => {
      return a.authority == role;
    })
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
  setUserRole(value: string) {
    localStorage.setItem('role', value);
  }
  get userRole(): string {
    return localStorage.getItem('role');
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
