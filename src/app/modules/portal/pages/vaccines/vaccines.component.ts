import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { VaccineState } from 'src/app/core/enums/vaccine-state.enum';
import { Statistic } from 'src/app/core/models/statistic';
import { AuthService } from 'src/app/core/services/auth.service';
import { Hospital } from 'src/app/core/models/hospital';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { VaccineType } from 'src/app/core/enums/vaccine-type.enum';
import { PortalService } from 'src/app/core/services/portal.service';
import { VaccineDto } from 'src/app/core/models/vaccine-dto';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.scss'],
})
export class VaccinesComponent implements OnDestroy, OnInit {
  vaccineFormGroup: FormGroup;
  subscriptions: Subscription[] = [];
  hospital: Hospital;
  companies$ = this.portalService.getCompanies();
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
  vaccinesFromFile: VaccineDto[] = [];
  fileName: string = '';
  fileToLoad: File;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private portalService: PortalService,
    private toastr: ToastrService
  ) {
    this.subscriptions.push(
      this.portalService.getUser(this.authService.userId).subscribe((u) => {
        this.hospital = u.hospital;
        this.initFormGroup();
        this.getStatistics(this.hospital.id);
      })
    );
  }
  ngOnInit(): void {
    this.initFormGroup();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  initFormGroup() {
    this.vaccineFormGroup = this.fb.group({
      code: [null, Validators.required],
      company_name: [null, Validators.required],
    });
  }

  addVaccine() {
    if (this.vaccineFormGroup.valid) {
      this.subscriptions.push(
        this.portalService.addVacine(this.vaccineFormGroup.value).subscribe(
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
    this.statistics$ = this.portalService.getStatistics(id).pipe(
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

  handleFileInput(files: FileList) {
    this.fileToLoad = files.item(0);
    this.fileName = '';
    if (this.fileToLoad.type == 'application/json') {
      this.fileName = this.fileToLoad.name;
      const fileReader = new FileReader();

      fileReader.onloadend = (e) => {
        this.vaccinesFromFile = JSON.parse(
          //JSON.stringify()
          fileReader.result.toString()
        );
      };
      fileReader.readAsText(this.fileToLoad, 'UTF-8');
    } else {
      this.toastr.warning('Typem pliku musi być JSON');
    }
  }
  addFileVaccines() {
    /*this.subscriptions.push(
      this.portalService.addVacines(this.vaccinesFromFile).subscribe(
        (data) => {
          this.initFormGroup();
          this.toastr.success('Dodano szczepionki');
          this.getStatistics(this.hospital.id);
        },
        (error) => {
          this.toastr.error('Nie udało się dodać szczepionek');
        }
      )
    );*/
    this.vaccinesFromFile.forEach((v) => {
      this.subscriptions.push(this.portalService.addVacine(v).subscribe());
    });
    this.toastr.success('Dodano szczepionki');
    this.fileName = null;
    this.fileToLoad = null;
    this.getStatistics(this.hospital.id);
  }
}
