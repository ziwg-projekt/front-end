import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PatientComponent} from '../patient.component';
import {PatientDashboardComponent} from '../patient-dashboard/patient-dashboard.component';
import {PatientInfoComponent} from '../patient-info/patient-info.component';

const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full',
      },
      {
        path: 'info',
        component: PatientInfoComponent,
      },
      {
        path: 'dashboard',
        component: PatientDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PatientRoutingModule {
}
