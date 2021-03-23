import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: { icon: string, label: string }[];
  public currentStep: string;

  constructor() {
    this.menuItems = [
      {icon: 'home', label: 'Strona główna'},
      {icon: 'assignment', label: 'Dane osobowe'},
      {icon: 'map', label: 'Wybór placówki'},
      {icon: 'poll', label: 'Podsumowanie'},
      {icon: 'done', label: 'Akceptacja'},
    ];
    this.currentStep = 'Strona główna';
  }

  ngOnInit(): void {
  }

  public changeCurrentStep(newLabel: string): void {
    this.currentStep = newLabel;
  }
}
