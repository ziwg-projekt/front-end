import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../core/services/api.service';

@Component({
  selector: 'app-form-personal-data',
  templateUrl: './form-personal-data.component.html',
  styleUrls: ['./form-personal-data.component.scss']
})
export class FormPersonalDataComponent implements OnInit {
  public form: FormGroup;
  value: any;
  public notificationTypes: {name: string, value: number}[];

  constructor(private api: ApiService) {
    this.form = new FormGroup({
      pesel: new FormControl(null),
      communication_channel_type: new FormControl(null)
    });
    this.notificationTypes = [
      {
        name: 'SMS',
        value: 0
      },
      {
        name: 'E-mail',
        value: 1
      }
    ];
  }

  ngOnInit(): void {
  }

  public submitForm(): void {
    // console.log(this.form.value);
    this.api.sendCitizenNotify(this.form.value).subscribe(res => {
      console.log(res);
    });
  }

}
