import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Vaccine } from '../models/vaccine';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { Hospital } from '../models/hospital';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  host: string = environment.host;
  private currentHospital: BehaviorSubject<Hospital> = new BehaviorSubject(null);
  constructor(private http: HttpClient, private authService: AuthService) {
      this.loadHospital();
  }

  get currentHospitalValue(): Observable<Hospital> {
    return this.currentHospital.asObservable();
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.host + 'v1/users/' + id);
  }

  loadHospital() {
    this.getUser(this.authService.userId).pipe(
      map((u) => {
        return u.hospital;
      })
    ).subscribe(h=>{
      this.currentHospital.next(h);
    });
  }

  getHospitalStatistics(): Observable<any> {
    return this.http.get(this.host + `v1/hospitals/${this.currentHospital.value.id}/vaccines/stats`);
  }
}
