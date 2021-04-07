import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HospitalsService {
  host: string = environment.host;
  constructor(private http: HttpClient) {}

  getStatistics(id: number): Observable<any> {
    return this.http.get(this.host + `v1/hospitals/${id}/vaccines/stats`);
  }
}
