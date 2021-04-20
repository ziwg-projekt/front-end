import {Component, OnInit} from '@angular/core';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-form-main-page',
  templateUrl: './form-main-page.component.html',
  styleUrls: ['./form-main-page.component.scss']
})
export class FormMainPageComponent implements OnInit {
  public windowExtended$: Observable<string>;
  public newsArray: {
    date: string,
    label: string,
    labelExtension: string
  }[];

  constructor(public mediaObserver: MediaObserver) {
    this.newsArray = [
      {
        date: '10.03',
        label: 'MZ: Bardzo dużo nowych zakażeń',
        labelExtension: 'Szczegóły raportu MZ'
      },
      {
        date: '04.03',
        label: 'Znamy termin dostawy',
        labelExtension: 'Nowa partia szczepionek wkrótce'
      },
      {
        date: '28.02',
        label: 'Ostrzeżenie',
        labelExtension: 'Nowa mutacja koronawirusa w Polsce'
      },
      // {
      //   date: '13.02',
      //   label: 'Zaczynamy szczepić 70-latków',
      //   labelExtension: 'Kolejna grupa wiekowa'
      // }
    ];
    this.windowExtended$ = this.mediaObserver.asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0].mqAlias)
      );
  }

  ngOnInit(): void {
  }

}
