import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MaterialModule { }
