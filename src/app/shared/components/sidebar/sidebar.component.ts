import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItems: { icon: string; label: string; href: string }[];
  public currentStep: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.menuItems = [
      { icon: 'home', label: 'Strona główna', href: '/registration/main-page' },
      {
        icon: 'assignment',
        label: 'Dane osobowe',
        href: '/registration/personal-data',
      },
      {
        icon: 'map',
        label: 'Wybór placówki',
        href: '/registration/personal-data',
      },
      {
        icon: 'poll',
        label: 'Podsumowanie',
        href: '/registration/personal-data',
      },
      {
        icon: 'done',
        label: 'Akceptacja',
        href: '/registration/personal-data',
      },
    ];
    this.currentStep = 'Strona główna';
  }

  public navigate(route: string): void {
    this.router.navigate([route]);
  }

  ngOnInit(): void {}

  public changeCurrentStep(newLabel: any): void {
    this.navigate(newLabel.href);
    this.currentStep = newLabel.label;
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
     // if (this.authService.isLoggedIn())
        //this.router.navigate(['/portal']);
    });
  }
}
