import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-patient-confirm',
  templateUrl: './patient-confirm.component.html',
  styleUrls: ['./patient-confirm.component.scss']
})
export class PatientConfirmComponent implements OnInit {
  @Output() confirm = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
