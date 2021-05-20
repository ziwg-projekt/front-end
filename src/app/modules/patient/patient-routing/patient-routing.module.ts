import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PatientComponent } from '../patient.component';

const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PatientRoutingModule {}
