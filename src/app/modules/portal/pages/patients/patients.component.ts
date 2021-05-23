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
import { NewAppointmentDialogComponent } from '../../components/new-appointment-dialog/new-appointment-dialog.component';
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
          //pomocniczy pesel 99110323923
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
      address:[undefined],
      email: [undefined, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")],
      name: [undefined],
      surname: [undefined],
      pesel: [undefined],
      phone_number: [undefined, Validators.pattern("[0-9]{9}")],
      city: [undefined, Validators.required],
      street: [undefined, Validators.required],
      street_number: [undefined, Validators.required],
      username: [undefined],
      password: [undefined],
    });
  }

  submitForm() {
    if (!this.personalId.value) {
      this.citizenForm.get("username").setValidators(Validators.required);
      this.citizenForm.get("password").setValidators(Validators.required);
      if (this.citizenForm.valid) {
      this.subscriptions.push(
        this.portalService
          .addPatientInHospital(this.citizenForm.value)
          .subscribe(
            (c) => {
              this.patchValueOfCitizen(c);
              this.currentCitizen = c;
              this.toastr.success('Pomyslnie dodano pacjenta');
            },
            (e) => {
              this.toastr.error('Błąd podczas rejestracji pacjenta');
            }
          )
      );
        }else{
          this.citizenForm.markAllAsTouched();
          this.toastr.warning('Proszę wypełnić wymagane pola');
        }
    } else {
      this.citizenForm.get("username").clearValidators();
      this.citizenForm.get("password").clearValidators();
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
                this.toastr.error('Błąd podczas aktualizowaneia danych');
              }
            )
        );
      }else{
        this.citizenForm.markAllAsTouched();
        this.toastr.warning('Proszę wypełnić wymagane pola');
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
  

  openAppointmentDialog(a: Appointment) {
    const dialogRef = this.dialog.open(NewAppointmentDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        hospitalId: this.hospital.id,
        appointment: a,
      },
    });
  }

  doneAppointment(a: Appointment) {
    this.portalService.madeAppointment(a).subscribe((a) => {
      this.getAppointments();
      this.toastr.success('Pomyślnie zmieniono status szczepienia');
    });
  }

  cancelAppointment(a: Appointment) {
    this.portalService.notMadeAppointment(a).subscribe((a) => {
      this.getAppointments();
      this.toastr.success(
        'Pomyślnie odwołono szczepienie dla danego pacjenta'
      );
    });
  }
}
