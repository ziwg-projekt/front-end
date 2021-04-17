import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { CitizenStateType } from 'src/app/core/enums/citizen-state.enum';
import { Citizen } from 'src/app/core/models/citizen';
import { CitizensService } from 'src/app/core/services/citizens.service';
import { PortalService } from 'src/app/core/services/portal.service';

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
  appointments$: Observable<any>;
  enableForm: boolean = false;

  constructor(
    private citizensService: CitizensService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private portalService: PortalService
  ) {}

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
      console.log(this.personalId.valid);
      this.subscriptions.push(
        this.citizensService.getPatient(this.personalId.value).subscribe(
          //2888924742
          (c) => {
            this.patchValueOfCitizen(c);
            this.enableForm = true;
            this.appointments$ = this.citizensService.getPatientAppointments(
              this.personalId.value
            );
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
      address: [undefined],
      email: [undefined],
      hospital: [undefined],
      name: [undefined],
      surname: [undefined],
      pesel: [undefined],
      phone_number: [undefined],
      city: [undefined],
      street: [undefined],
      street_number: [undefined],
      state: [CitizenStateType.Waiting],
    });
  }

  submitForm() {
    if (!this.personalId.value) {
      console.log('dodaj nowego');
    } else {
      console.log('zmiana');
    }
  }

  patchValueOfCitizen(citizen: Citizen) {
    this.citizenForm.patchValue(citizen);
    this.citizenForm.get('city').setValue(citizen.address.city);
    this.citizenForm.get('street').setValue(citizen.address.street);
    this.citizenForm.get('street_number').setValue(citizen.address.street_number);
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
}
