import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  public myAppointments: any[];

  constructor(private api: ApiService, private router: Router) {
    this.myAppointments = [];
  }

  ngOnInit(): void {
    this.api.selfAppointments().subscribe(res => {
      this.myAppointments = res;
    });
  }

  openAppointmentDialog(a: any): void {

  }

  cancelAppointment(a: any): void {
    this.api.cancelAppointment(a.id).subscribe(res => {
      this.router.navigate(['/patient/dashboard']);
    });
  }
}
