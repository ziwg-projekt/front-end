import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { Authority } from 'src/app/core/enums/authority.enum';

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
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

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

  private initPortalItems(): void {
    switch (this.authService.userRole) {
      case Authority.Admin:
        this.menuItems = [
          { icon: 'local_hospital', label: 'Szpital', href: '/admin/hospital' },
          { icon: 'business', label: 'Firmy', href: '/admin/companies' },
        ];
        this.currentStep = 'Szpital';
        break;
      case Authority.Hospital:
        this.menuItems = [
          { icon: 'security', label: 'Szczepionki', href: '/portal/vaccines' },
          { icon: 'people', label: 'Pacjenci', href: '/portal/patients' },
          { icon: 'calendar_today', label: 'Szczepienia', href: '/portal/appointments' },
          { icon: 'medication', label: 'Kadra lekarzy', href: '/portal/doctors' },
        ];
        break;
      case Authority.Citizen:
        this.menuItems = [
          { icon: 'security', label: 'Szczepienie', href: '/patient/info' },
          { icon: 'location_on', label: 'Plac??wki', href: '/patient/dashboard' },
        ];
        break;
    }
    this.currentStep = this.checkActualStep();
  }

  private initFormItems(): void {
    this.menuItems = [
      {
        icon: 'home',
        label: 'Strona g????wna',
        href: '/registration/main-page',
      },
      {
        icon: 'assignment',
        label: 'Dane osobowe',
        href: '/registration/personal-data',
      },
      {
        icon: 'map',
        label: 'Wyb??r plac??wki',
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
    this.currentStep = this.checkActualStep();
  }

  private checkActualStep(): string {
    console.log(this.route.snapshot.firstChild);
    const actualRouteEnd = this.route.snapshot.firstChild.routeConfig.path;
    for (const item of this.menuItems) {
      if (item.href.includes(actualRouteEnd)) {
        return item.label;
      }
    }
    return this.menuItems[0].label;
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
        this.toastr.success('Pomy??lne logowanie');
        switch (this.authService.userRole) {
          case Authority.Admin:
            return this.router.navigate(['/admin']);
          case Authority.Hospital:
            return this.router.navigate(['/portal']);
          case Authority.Citizen:
            return this.router.navigate(['/patient']);
        }
      }
    });
  }

  logout() {
    this.authService.logOut();
    this.toastr.success('Wylogowano');
    this.router.navigate(['/registration/main-page']);
  }
}
