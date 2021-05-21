import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  public sidenavObserver$: Observable<boolean>;

  constructor(public mediaObserver: MediaObserver) {
    this.sidenavObserver$ = this.mediaObserver.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map(
        (changes: MediaChange[]) =>
          changes[0].mqAlias === 'sm' || changes[0].mqAlias === 'xs'
      )
    );
  }

  ngOnInit(): void {}

  public toggleDrawer(): void {
    this.drawer.toggle();
  }
}
