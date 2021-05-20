import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Authority } from './core/enums/authority.enum';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'registration',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    loadChildren: () => import('./modules/registration-form/registration-form.module').then(m => m.RegistrationFormModule)
  },
  {
    path: 'portal',
    canActivate: [AuthGuard],
    data: {
      role: Authority.Hospital
    },
    loadChildren: () => import('./modules/portal/portal.module').then(m => m.PortalModule)
  },
  {
    path: 'patient',
    canActivate: [AuthGuard],
    data: {
      role: Authority.Citizen
    },
    loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {
      role: Authority.Admin
    },
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
