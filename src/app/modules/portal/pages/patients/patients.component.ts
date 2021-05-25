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
import { Appointment } from 'src/app/core/models/appointment';
import { Citizen } from 'src/app/core/models/citizen';
import { Hospital } from 'src/app/core/models/hospital';
import { PortalService } from 'src/app/core/services/portal.service';
import { NewAppointmentDialogComponent } from '../../components/new-appointment-dialog/new-appointment-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';

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
  isNewCitizenRegister: boolean = false;
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
      //looking for patient in hospital
      console.log(this.isNewCitizenRegister);
      if (!this.isNewCitizenRegister) {
        this.subscriptions.push(
          this.portalService.getPatient(this.personalId.value).subscribe(
            //pomocniczy pesel 99110323923
            (c) => {
              this.patchValueOfCitizen(c);
              this.currentCitizen = c;
              this.getAppointments();
            },
            (error) => {
              this.toastr.warning(
                `Nie ma takiego pacjenta z numerem PESEL ${this.personalId.value}`
              );
            }
          )
        );
        //looking for citizen from government api
      } else {
        this.subscriptions.push(
          this.portalService
            .getCitizenFromGovernmentApi(this.personalId.value)
            .subscribe(
              //pomocniczy pesel 56111245968
              (c) => {
                this.patchValueOfCitizen(c);
                this.currentCitizen = c;
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
  }

  initForm() {
    this.citizenForm = this.fb.group({
      email: [undefined],
      name: [undefined],
      surname: [undefined],
      pesel: [undefined],
      phone_number: [undefined],
      username: [undefined],
      password: [undefined],
      address: [undefined],
      city: [undefined, Validators.required],
      street: [undefined, Validators.required],
      street_number: [undefined, Validators.required],
    });
  }

  submitForm() {
    if (this.isNewCitizenRegister) {
      this.citizenForm.get('username').setValidators(Validators.required);
      this.citizenForm.get('password').setValidators(Validators.required);
      if (this.citizenForm.valid) {
        this.subscriptions.push(
          this.portalService
            .addPatientInHospital(this.citizenForm.value)
            .subscribe(
              (c) => {
                this.patchValueOfCitizen(c);
                this.currentCitizen = c;
                this.isNewCitizenRegister = false;
                this.toastr.success('Pomyslnie dodano pacjenta');
              },
              (e) => {
                this.toastr.error(
                  'Pacjent o podanym numerze PESEl jest już zarejestrowany w szpitalu'
                );
              }
            )
        );
      } else {
        this.citizenForm.markAllAsTouched();
        this.toastr.warning('Proszę wypełnić wymagane pola');
      }
    } else {
      this.citizenForm.get('username').clearValidators();
      this.citizenForm.get('password').clearValidators();
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
      } else {
        this.citizenForm.markAllAsTouched();
        this.toastr.warning('Proszę wypełnić wymagane pola');
      }
    }
  }

  patchValueOfCitizen(citizen: Citizen) {
    this.citizenForm.patchValue(citizen);
    if (citizen.address) {
      this.citizenForm.get('city').setValue(citizen.address.city);
      this.citizenForm.get('street').setValue(citizen.address.street);
      this.citizenForm
        .get('street_number')
        .setValue(citizen.address.street_number);
    }
  }

  resetValues() {
    if (!this.isNewCitizenRegister) this.isNewCitizenRegister = false;
    this.personalId.reset();
    this.citizenForm.reset();
    this.currentCitizen = null;
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
      this.toastr.success('Pomyślnie odwołono szczepienie dla danego pacjenta');
    });
  }
}
