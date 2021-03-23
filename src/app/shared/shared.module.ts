import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MaterialModule} from '../modules/material/material.module';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedModule { }
