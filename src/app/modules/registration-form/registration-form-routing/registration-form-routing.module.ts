import {RouterModule, Routes} from '@angular/router';
import {RegistrationFormComponent} from '../registration-form.component';
import {NgModule} from '@angular/core';
import {FormMainPageComponent} from '../pages/form-main-page/form-main-page.component';
import {FormPersonalDataComponent} from '../pages/form-personal-data/form-personal-data.component';
import {FormMapStageComponent} from '../pages/form-map-stage/form-map-stage.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationFormComponent,
    children: [
      {
        path: 'main-page',
        component: FormMainPageComponent
      },
      {
        path: 'personal-data',
        component: FormPersonalDataComponent
      },
      {
        path: 'map',
        component: FormMapStageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RegistrationFormRoutingModule {
}
