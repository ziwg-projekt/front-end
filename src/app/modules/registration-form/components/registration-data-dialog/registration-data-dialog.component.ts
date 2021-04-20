import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../core/services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-data-dialog',
  templateUrl: './registration-data-dialog.component.html',
  styleUrls: ['./registration-data-dialog.component.scss']
})
export class RegistrationDataDialogComponent implements OnInit {
  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private api: ApiService, private toastr: ToastrService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      street_number: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {

  }

  public submitForm(): void {
    console.log(this.data);
    this.api.customPostAction(this.data.registerApi, this.form.value).subscribe(() => {
      this.toastr.success('Zarejestrowano pomyślnie');
      this.router.navigateByUrl('/registration/main-page');
    }, error => {
      this.toastr.error('Spróbuj ponownie za chwilę');
      this.router.navigateByUrl('/registration/main-page');
    });
  }

}
