import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PortalComponent } from '../portal.component';
import { VaccinesComponent } from '../pages/vaccines/vaccines.component';

const routes: Routes = [
  {
    path: '',
    component:PortalComponent,
    children: [ 
      {
      path: '',
      redirectTo: 'vaccines',
      pathMatch: 'full',
    },
      {
        path: 'vaccines',
        component: VaccinesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PortalRoutingModule {}
