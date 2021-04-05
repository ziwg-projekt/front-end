import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Vaccine } from '../models/vaccine';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  host: string = environment.host;
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.host + 'v1/users/' + id);
  }
}
