import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() portalVersion: boolean = false;
  public menuItems: { icon: string; label: string; href: string }[];
  public currentStep: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.portalVersion) {
      this.initPortalItems();
    } else {
      this.initFormItems();
    }
  }

  initPortalItems() {
    this.menuItems = [
      { icon: 'security', label: 'Szczepionki', href: '/portal/vaccines' },
      { icon: 'people', label: 'Pacjenci', href: '/portal/patients' },
    ];
    this.currentStep = 'Szczepionki';
  }

  initFormItems() {
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

  public changeCurrentStep(newLabel: any): void {
    this.navigate(newLabel.href);
    this.currentStep = newLabel.label;
  }
}
