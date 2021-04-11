import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalGuard } from './core/guards/portal.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/registration/main-page',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    loadChildren: () => import('./modules/registration-form/registration-form.module').then(m => m.RegistrationFormModule)
  },
  {
    path: 'portal',
    canActivate: [PortalGuard],
    loadChildren: () => import('./modules/portal/portal.module').then(m => m.PortalModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
