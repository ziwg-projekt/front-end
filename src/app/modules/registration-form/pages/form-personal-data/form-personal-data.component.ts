import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../core/services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {AuthenticationCodeDialogComponent} from '../../components/authentication-code-dialog/authentication-code-dialog.component';
import {concatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserCandidateModel} from '../../../../core/models/user-candidate.model';
import {RegistrationInfoDialogComponent} from '../../components/registration-info-dialog/registration-info-dialog.component';

@Component({
  selector: 'app-form-personal-data',
  templateUrl: './form-personal-data.component.html',
  styleUrls: ['./form-personal-data.component.scss']
})
export class FormPersonalDataComponent implements OnInit {
  public form: FormGroup;
  public notificationTypes: { name: string, value: number }[];
  public spinnerActive = false;

  constructor(
    private api: ApiService,
    private dialog: MatDialog
  ) {
    this.form = new FormGroup({
      pesel: new FormControl('78101134985', [Validators.required]),
      communication_channel_type: new FormControl(null, [Validators.required])
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
    if (this.form.valid) {
      let dialogRef;
      this.spinnerActive = true;
      this.api.sendCitizenNotify(this.form.value).pipe(
        concatMap((res: { verify_api_path: string }): Observable<UserCandidateModel> => {
          dialogRef = this.dialog.open(AuthenticationCodeDialogComponent, {
            width: '250px',
            data: {
              address: res.verify_api_path
            }
          });
          this.spinnerActive = false;
          return dialogRef.componentInstance.authenticationConfirmed;
        })
      ).subscribe((confirmedUser: UserCandidateModel) => {
        console.log(confirmedUser);
        dialogRef.close();
      }, error => {
        this.spinnerActive = false;
        let errorInfo;
        error.status === 404 ? errorInfo = {
              mainInfo: 'Niepoprawny nr. PESEL',
              extendInfo: 'Spróbuj ponownie'
            } : errorInfo = {
            mainInfo: 'Błąd',
            extendInfo: 'Spróbuj ponownie'
          };
        this.dialog.open(RegistrationInfoDialogComponent, {
          width: '350px',
          data: errorInfo
        });
      });
    }
  }

}
