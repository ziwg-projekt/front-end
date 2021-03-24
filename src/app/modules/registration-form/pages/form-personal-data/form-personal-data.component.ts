import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-personal-data',
  templateUrl: './form-personal-data.component.html',
  styleUrls: ['./form-personal-data.component.scss']
})
export class FormPersonalDataComponent implements OnInit {
  public form: FormGroup;
  value: any;

  constructor() {
    this.form = new FormGroup({
      pesel: new FormControl(null),
      confirmationType: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

}
