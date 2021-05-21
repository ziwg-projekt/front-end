import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { HospitalComponent } from '../hospital/hospital.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'hospital',
        pathMatch: 'full',
      },
      {
        path: 'hospital',
        component: HospitalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AdminRoutingModule {}
