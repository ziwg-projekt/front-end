import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subscriptions: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  logIn() {
    if (this.loginForm.valid) {
      this.subscriptions.push(
        this.authService.logIn(this.loginForm.value).subscribe(
          (data) => {
            this.dialogRef.close(data);
          },
          (error) => {}
        )
      );
    }
  }
}
