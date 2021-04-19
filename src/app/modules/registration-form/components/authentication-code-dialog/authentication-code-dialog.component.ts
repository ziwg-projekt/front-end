import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ApiService} from '../../../../core/services/api.service';
import {UserCandidateModel} from '../../../../core/models/user-candidate.model';

@Component({
  selector: 'app-authentication-code-dialog',
  templateUrl: './authentication-code-dialog.component.html',
  styleUrls: ['./authentication-code-dialog.component.scss']
})
export class AuthenticationCodeDialogComponent implements OnInit {
  public form: FormGroup;
  @Output() authenticationConfirmed = new EventEmitter<UserCandidateModel>();

  constructor(@Inject(MAT_DIALOG_DATA) public data, private api: ApiService) {
    this.form = new FormGroup({
      registration_code: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log(this.data.address);
  }

  public submitForm(): void {
    if (this.form.valid) {
      this.api.customPostAction(this.data.address, this.form.value).subscribe((citizen: {
        person: UserCandidateModel,
        register_api_path: string
      }) => {

        // this.authenticationConfirmed.emit(citizen.person);
      }, () => {
        // this.authenticationConfirmed.emit(null);
      });

    }
  }
}
