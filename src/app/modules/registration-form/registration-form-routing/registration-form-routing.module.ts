import {RouterModule, Routes} from '@angular/router';
import {RegistrationFormComponent} from '../registration-form.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: RegistrationFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RegistrationFormRoutingModule {
}
