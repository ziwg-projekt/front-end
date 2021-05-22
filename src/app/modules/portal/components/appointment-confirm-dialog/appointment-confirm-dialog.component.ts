import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-confirm-dialog',
  templateUrl: './appointment-confirm-dialog.component.html',
  styleUrls: ['./appointment-confirm-dialog.component.scss'],
})
export class AppointmentConfirmDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AppointmentConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
}
