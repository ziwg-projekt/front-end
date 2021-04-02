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
}
