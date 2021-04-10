import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from 'src/app/core/services/auth.service';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() portalVersion = false;
  public menuItems: { icon: string; label: string; href: string }[];
  public currentStep: string;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngOnInit(): void {
    if (this.portalVersion) {
      this.initPortalItems();
    } else {
      this.initFormItems();
    }
  }

  initPortalItems() {
    this.menuItems = [
      {icon: 'security', label: 'Szczepionki', href: '/portal/vaccines'},
      {icon: 'people', label: 'Pacjenci', href: '/portal/patients'},
    ];
    this.currentStep = 'Szczepionki';
  }

  initFormItems() {
    this.menuItems = [
      {icon: 'home', label: 'Strona główna', href: '/registration/main-page'},
      {
        icon: 'assignment',
        label: 'Dane osobowe',
        href: '/registration/personal-data',
      },
      {
        icon: 'map',
        label: 'Wybór placówki',
        href: '/registration/map',
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

  public changeCurrentStep(newLabel: any): void {
    this.navigate(newLabel.href);
    this.currentStep = newLabel.label;
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (this.authService.isLoggedIn()) {
        this.toastr.success('Pomyślne logowanie');
        this.router.navigate(['/portal']);
      }
    });
  }

  logout() {
    this.authService.logOut();
    this.toastr.success('Wylogowano');
    this.router.navigate(['/registration']);
  }
}
