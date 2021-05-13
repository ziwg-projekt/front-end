import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Appointment } from 'src/app/core/models/appointment';
import { AppointmentDto } from 'src/app/core/models/appointment-dto';
import { Hospital } from 'src/app/core/models/hospital';
import { AuthService } from 'src/app/core/services/auth.service';
import { PortalService } from 'src/app/core/services/portal.service';
import { NewAppointmentDialogComponent } from './new-appointment-dialog/new-appointment-dialog.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit, OnDestroy {

  hospital: Hospital;
  subscriptions: Subscription[] = [];
  appointments$ = this.portalService.getHospitalAppointments();
  constructor(private portalService: PortalService,
    public dialog: MatDialog,
    private authService: AuthService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.subscriptions.push(
      this.portalService.getUser(this.authService.userId).subscribe((u) => {
        this.hospital = u.hospital;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  openNewAppointmentDialog() {
    const dialogRef = this.dialog.open(NewAppointmentDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        hospitalId: this.hospital.id,
      },
    });

    dialogRef.afterClosed().subscribe((data: Appointment) => {
      if (data && data.citizen) {
        let appointmentDto: AppointmentDto = {
          citizenPesel: data.citizen.pesel,
          doctorId: data.doctor.id,
          vaccineCode: data.vaccine.code,
          date: this.datePipe.transform(data.date, 'yyyy-MM-dd HH:mm'),
        };

        this.portalService.addAppointment(appointmentDto).subscribe((a) => {
          this.getAppointments();
        });
      }
    });
  }

  openAppointmentDialog(a: Appointment) {
    const dialogRef = this.dialog.open(NewAppointmentDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        hospitalId: this.hospital.id,
        appointment: a,
      },
    });
    dialogRef.afterClosed().subscribe((data: Appointment) => {});
  }

  getAppointments() {
    this.appointments$ = this.portalService.getHospitalAppointments();
  }
}
