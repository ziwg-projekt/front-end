import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { VaccineState } from 'src/app/core/enums/vaccine-state.enum';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { VaccinesService } from 'src/app/core/services/vaccines.service';
import { HospitalsService } from 'src/app/core/services/hospitals.service';
import { Statistic } from 'src/app/core/models/statistic';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Hospital } from 'src/app/core/models/hospital';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { VaccineType } from 'src/app/core/enums/vaccine-type.enum';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.scss'],
})
export class VaccinesComponent implements OnInit, OnDestroy {
  vaccineFormGroup: FormGroup;
  subscriptions: Subscription[] = [];
  hospital: Hospital;
  companies$ = this.companiesService.getCompanies();
  statistics$: Observable<any[]>;
  statisticsTypes: Statistic[] = [
    { type: VaccineState.Available, value: 'Dostępne szczepionki' },
    { type: VaccineState.Assigned, value: 'Przypisane szczepionki' },
    { type: VaccineState.Given, value: 'Rozdane szczepionki' },
  ];
  vaccinesTypes: any[] = [
    { type: VaccineType.Genetic, value: 'Genetyczna' },
    { type: VaccineType.Vectorial, value: 'Wektorowa' },
  ];
  chosenStatistic: Statistic = this.statisticsTypes[0];
  vaccineState = VaccineState;

  constructor(
    private fb: FormBuilder,
    private vaccinesService: VaccinesService,
    private companiesService: CompaniesService,
    private hospitalsService: HospitalsService,
    private authService: AuthService,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {
    this.subscriptions.push(
      this.usersService.getUser(this.authService.userId).subscribe((u) => {
        this.hospital = u.hospital;
        this.getStatistics(this.hospital.id);
        this.initFormGroup();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.vaccineFormGroup = this.fb.group({
      code: [null, Validators.required],
      company: [null, Validators.required],
      hospital: [this.hospital],
      state: [VaccineState.Available],
      type: [null, Validators.required],
    });
  }

  addVaccine() {
    console.log(this.vaccineFormGroup.value);
    if (this.vaccineFormGroup.valid) {
      this.subscriptions.push(
        this.vaccinesService.addVacine(this.vaccineFormGroup.value).subscribe(
          (data) => {
            this.initFormGroup();
            this.toastr.success('Dodano szczepionkę');
            this.getStatistics(this.hospital.id);
          },
          (error) => {
            this.toastr.error('Nie udało się dodać szczepionki');
          }
        )
      );
    } else {
      this.toastr.warning('Wypełnij informacje o szczepionce');
      this.vaccineFormGroup.markAllAsTouched();
    }
  }

  getStatistics(id: number) {
    this.statistics$ = this.hospitalsService.getStatistics(id).pipe(
      map((s) => {
        return this.sortStatistics(s);
      })
    );
  }
  sortStatistics(statistics) {
    switch (this.chosenStatistic.type) {
      case VaccineState.Given: {
        return statistics.sort((a, b) => b.given - a.given);
      }
      case VaccineState.Available: {
        return statistics.sort((a, b) => b.available - a.available);
      }
      case VaccineState.Assigned: {
        return statistics.sort((a, b) => b.assigned - a.assigned);
      }
    }
  }
}
