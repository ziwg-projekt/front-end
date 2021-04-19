import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-registration-info-dialog',
  templateUrl: './registration-info-dialog.component.html',
  styleUrls: ['./registration-info-dialog.component.scss']
})
export class RegistrationInfoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {mainInfo: string, extendInfo: string}) { }

  ngOnInit(): void {
  }

}
