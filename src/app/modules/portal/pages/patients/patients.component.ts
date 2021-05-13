import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CitizenStateType } from 'src/app/core/enums/citizen-state.enum';
import { Appointment } from 'src/app/core/models/appointment';
import { Citizen } from 'src/app/core/models/citizen';
import { Hospital } from 'src/app/core/models/hospital';
import { PortalService } from 'src/app/core/services/portal.service';
import { NewAppointmentDialogComponent } from '../appointments/new-appointment-dialog/new-appointment-dialog.component';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppointmentDto } from 'src/app/core/models/appointment-dto';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit, OnDestroy {
  personalId: FormControl = new FormControl(undefined, [
    Validators.required,
    Validators.pattern(/^[0-9]\d*$/),
  ]);
  citizenForm: FormGroup;
  subscriptions: Subscription[] = [];
  appointments$: Observable<Appointment[]>;
  enableForm: boolean = false;
  hospital: Hospital;
  currentCitizen: Citizen;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private portalService: PortalService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {
    this.subscriptions.push(
      this.portalService.getUser(this.authService.userId).subscribe((u) => {
        this.hospital = u.hospital;
        this.initForm();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngOnInit() {
    this.initForm();
  }

  searchPatient() {
    if (this.personalId.valid && this.personalId.value != '') {
      this.subscriptions.push(
        this.portalService.getPatient(this.personalId.value).subscribe(
          //pomocniczy pesel 56111245968
          (c) => {
            this.patchValueOfCitizen(c);
            this.currentCitizen = c;
            this.enableForm = true;
            this.getAppointments();
          },
          (error) => {
            this.toastr.warning(
              `Nie ma takiego pacjenta z numerem PESEL ${this.personalId.value}`
            );
          }
        )
      );
    }
  }

  initForm() {
    this.citizenForm = this.fb.group({
      address: [undefined, Validators.required],
      email: [undefined, Validators.required],
      hospital: [this.hospital],
      name: [undefined, Validators.required],
      surname: [undefined, Validators.required],
      pesel: [undefined, Validators.required],
      phone_number: [undefined],
      city: [undefined, Validators.required],
      street: [undefined, Validators.required],
      street_number: [undefined, Validators.required],
      state: [CitizenStateType.Waiting],
    });
  }

  submitForm() {
    if (!this.personalId.value) {
      //dodanie nowego pacjenta
    } else {
      if (this.citizenForm.valid) {
        this.subscriptions.push(
          this.portalService
            .editPatientData(this.currentCitizen.pesel, this.citizenForm.value)
            .subscribe(
              (c) => {
                this.patchValueOfCitizen(c);
                this.currentCitizen = c;
                this.toastr.success('Dane pacjenta zostały zaktualizowane');
              },
              (e) => {
                this.toastr.success('Błąd podczas aktualizowaneia danych');
              }
            )
        );
      }
    }
  }

  patchValueOfCitizen(citizen: Citizen) {
    this.citizenForm.patchValue(citizen);
    this.citizenForm.get('city').setValue(citizen.address.city);
    this.citizenForm.get('street').setValue(citizen.address.street);
    this.citizenForm
      .get('street_number')
      .setValue(citizen.address.street_number);
  }

  newUserToggle() {
    if ((this.enableForm && this.personalId.enabled) || !this.enableForm) {
      this.enableForm = true;
      this.personalId.disable();
    } else if (this.enableForm && !this.personalId.enabled) {
      this.enableForm = false;
      this.personalId.enable();
    }
    this.resetValues();
  }

  resetSearch() {
    if (this.personalId.enabled) {
      this.resetValues();
      this.enableForm = false;
    }
  }

  resetValues() {
    this.personalId.reset();
    this.citizenForm.reset();
    this.appointments$ = null;
  }

  getAppointments() {
    this.appointments$ = this.portalService.getPatientAppointments(
      this.currentCitizen.pesel
    );
  }
  openNewAppointmentDialog() {
    const dialogRef = this.dialog.open(NewAppointmentDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        hospitalId: this.hospital.id,
        citizen: this.currentCitizen,
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
        citizen: this.currentCitizen,
        appointment: a,
      },
    });
    dialogRef.afterClosed().subscribe((data: Appointment) => {});
  }
}
