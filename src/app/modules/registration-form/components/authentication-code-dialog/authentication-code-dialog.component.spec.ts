import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationCodeDialogComponent } from './authentication-code-dialog.component';

describe('AuthenticationCodeDialogComponent', () => {
  let component: AuthenticationCodeDialogComponent;
  let fixture: ComponentFixture<AuthenticationCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationCodeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
