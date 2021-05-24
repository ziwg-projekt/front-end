import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {Hospital} from '../../../core/models/hospital';
import * as mapboxgl from 'mapbox-gl';
import {Appointment} from '../../../core/models/appointment';
import {MatDialog} from '@angular/material/dialog';
import {PatientConfirmComponent} from '../patient-confirm/patient-confirm.component';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  public hospitalArray: Hospital[];
  public actualHospital: Hospital;
  public appointmentArray: any[];

  constructor(public api: ApiService, private dialog: MatDialog, private router: Router) {
    this.hospitalArray = [];
    this.appointmentArray = [];
  }

  ngOnInit(): void {
    this.api.getHospitals().subscribe((hospitals: Hospital[]) => {
      for (const item of hospitals) {
        item.marker = new mapboxgl.Marker({
          draggable: true,
        }).setLngLat([item.address.longitude, item.address.latitude]);
      }
      this.hospitalArray = hospitals;
      this.api.mapEvolved.next();
    });
  }

  public openAppointmentDialog(appointment: Appointment): void {
    const dialogRef = this.dialog.open(PatientConfirmComponent);
    dialogRef.componentInstance.confirm.subscribe(res => {
      dialogRef.close();
      if (res) {
        this.api.appointmentSign(appointment.id).subscribe(() => {
           this.router.navigate(['/patient/info']);
        });
      }
    });
  }

  public fetchAppointments(hospital: Hospital): void {
    this.actualHospital = hospital;
    this.api.getAppointments(hospital.id).subscribe(res => {
      this.appointmentArray = res;
    });
  }
}
