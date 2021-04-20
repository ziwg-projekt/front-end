import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../core/services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {AuthenticationCodeDialogComponent} from '../../components/authentication-code-dialog/authentication-code-dialog.component';
import {concatMap, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {UserCandidateModel} from '../../../../core/models/user-candidate.model';
import {RegistrationInfoDialogComponent} from '../../components/registration-info-dialog/registration-info-dialog.component';
import {RegistrationDataDialogComponent} from '../../components/registration-data-dialog/registration-data-dialog.component';

@Component({
  selector: 'app-form-personal-data',
  templateUrl: './form-personal-data.component.html',
  styleUrls: ['./form-personal-data.component.scss']
})
export class FormPersonalDataComponent implements OnInit {
  public form: FormGroup;
  public notificationTypes: { name: string, value: number }[];
  public spinnerActive = false;
  public userDetails$: Observable<{userCandidateModel: UserCandidateModel, registerUrl: string}>;

  constructor(
    private api: ApiService,
    private dialog: MatDialog
  ) {
    this.form = new FormGroup({
      pesel: new FormControl('', [Validators.required]),
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
    this.userDetails$ = null;
  }

  ngOnInit(): void {
  }

  public submitForm(): void {
    if (this.form.valid) {
      this.spinnerActive = true;
      let dialogRef;
      this.userDetails$ = this.api.sendCitizenNotify(this.form.value).pipe(
        concatMap((res: { verify_api_path: string }): Observable<{userCandidateModel: UserCandidateModel, registerUrl: string}> => {
          dialogRef = this.dialog.open(AuthenticationCodeDialogComponent, {
            width: '250px',
            data: {
              address: res.verify_api_path
            }
          });
          this.spinnerActive = false;
          return dialogRef.componentInstance.authenticationConfirmed;
        }),
        tap((res) => {
            dialogRef.close();
          }, error => {
            this.spinnerActive = false;
            dialogRef.close();
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
          }
        )
      );
    }
  }

  public openRegistrationForm(registerUrl: string): void {
    this.dialog.open(RegistrationDataDialogComponent, {
      width: '350px',
      data: {
        registerApi: registerUrl
      }
    }).afterClosed().subscribe(() => {
      console.log('zamkniete');
    });
  }


  // this.userDetails$ = this.api.sendCitizenNotify(this.form.value).pipe(
  //   concatMap((res: { verify_api_path: string }): Observable<UserCandidateModel> => {
  //     dialogRef = this.dialog.open(AuthenticationCodeDialogComponent, {
  //       width: '250px',
  //       data: {
  //         address: res.verify_api_path
  //       }
  //     });
  //     this.spinnerActive = false;
  //     return dialogRef.componentInstance.authenticationConfirmed;
  //   })
  // ).subscribe((confirmedUser: UserCandidateModel) => {
  //   console.log(confirmedUser);
  //   dialogRef.close();
  // }, error => {
  //   this.spinnerActive = false;
  //   let errorInfo;
  //   error.status === 404 ? errorInfo = {
  //     mainInfo: 'Niepoprawny nr. PESEL',
  //     extendInfo: 'Spróbuj ponownie'
  //   } : errorInfo = {
  //     mainInfo: 'Błąd',
  //     extendInfo: 'Spróbuj ponownie'
  //   };
  //   this.dialog.open(RegistrationInfoDialogComponent, {
  //     width: '350px',
  //     data: errorInfo
  //   });
  // });

}
