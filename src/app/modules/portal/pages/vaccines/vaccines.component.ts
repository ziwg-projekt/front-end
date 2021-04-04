import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { VaccineStateEnum } from 'src/app/core/enums/vaccine-state.enum';
import { Company } from 'src/app/core/models/company';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { VaccinesService } from 'src/app/core/services/vaccines.service';
import { HospitalsService } from 'src/app/core/services/hospitals.service';
import { Statistic } from 'src/app/core/models/statistic';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.scss'],
})
export class VaccinesComponent implements OnInit, OnDestroy {
  vaccineFormGroup: FormGroup;
  subscriptions: Subscription[] = [];
  companies$ = this.companiesService.getCompanies();
  statistics$ = this.hospitalsService.getStatistics().pipe(
    map((s) => {
      return this.sortStatistics(s);
    })
  );
  statisticsTypes: Statistic[] = [
    { type: VaccineStateEnum.Available, value: 'Dostępne szczepionki' },
    { type: VaccineStateEnum.Assigned, value: 'Przypisane szczepionki' },
    { type: VaccineStateEnum.Given, value: 'Rozdane szczepionki' },
  ];
  chosenStatistic: Statistic = this.statisticsTypes[0];
  vaccineStateEnum = VaccineStateEnum;

  constructor(
    private fb: FormBuilder,
    private vaccinesService: VaccinesService,
    private companiesService: CompaniesService,
    private hospitalsService: HospitalsService
  ) {} //,private authService: AuthService;) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngOnInit() {
    this.vaccineFormGroup = this.fb.group({
      code: [null, Validators.required],
      company: [null, Validators.required],
      // hospital: [], //this.authService.getHospital()],
      state: [VaccineStateEnum.Available],
      type: [null, Validators.required],
    });
  }

  addVaccine() {
    console.log(this.vaccineFormGroup.value);
    if (this.vaccineFormGroup.valid) {
      this.subscriptions.push(
        this.vaccinesService
          .addVacine(this.vaccineFormGroup.value)
          .subscribe((data) => {
            console.log(data);
          })
      );
      this.vaccineFormGroup.reset();
    }
  }
  sortStatistics(statistics) {
    switch (this.chosenStatistic.type) {
      case VaccineStateEnum.Given: {
        return statistics.sort((a, b) => b.given - a.given);
      }
      case VaccineStateEnum.Available: {
        return statistics.sort((a, b) => b.available - a.available);
      }
      case VaccineStateEnum.Assigned: {
        return statistics.sort((a, b) => b.assigned - a.assigned);
      }
    }
  }
}
