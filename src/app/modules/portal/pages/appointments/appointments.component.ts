import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Appointment } from 'src/app/core/models/appointment';
import { AppointmentDto } from 'src/app/core/models/appointment-dto';
import { Hospital } from 'src/app/core/models/hospital';
import { AuthService } from 'src/app/core/services/auth.service';
import { PortalService } from 'src/app/core/services/portal.service';
import { NewAppointmentDialogComponent } from '../../components/new-appointment-dialog/new-appointment-dialog.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  hospital: Hospital;
  subscriptions: Subscription[] = [];
  appointments$: Observable<any>;

  constructor(
    private portalService: PortalService,
    public dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.portalService.getUser(this.authService.userId).subscribe((u) => {
        this.hospital = u.hospital;
        this.getAppointments(this.hospital.id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  /*openNewAppointmentDialog() {
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
          vaccineCode: data.vaccine.code,
          date: this.datePipe.transform(data.date, 'yyyy-MM-dd HH:mm'),
        };

        this.portalService.addAppointment(appointmentDto).subscribe((a) => {
          this.getAppointments(this.hospital.id);
        });
      }
    });
  }*/

  openAppointmentDialog(appointmentToUpdate: Appointment) {
    const dialogRef = this.dialog.open(NewAppointmentDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        hospitalId: this.hospital.id,
        appointment: appointmentToUpdate,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data.citizen) {
        appointmentToUpdate.citizen = data.citizen;
        this.subscriptions.push(
          this.portalService.addCitizenToAppointment(appointmentToUpdate).subscribe((a) => {
            this.toastrService.success(
              'Pomyślnie przypisano pacjenta do szczepienia'
            );
          })
        );
      }
    });
  }
  getAppointments(id) {
    this.appointments$ = this.portalService.getHospitalAppointments(id);
  }
}
