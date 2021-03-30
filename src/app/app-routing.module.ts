import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/registration',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    loadChildren: () => import('./modules/registration-form/registration-form.module').then(m => m.RegistrationFormModule)
  },
  {
    path: 'portal',
    loadChildren: () => import('./modules/portal/portal.module').then(m => m.PortalModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
