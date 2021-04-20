import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDataDialogComponent } from './registration-data-dialog.component';

describe('RegistrationDataDialogComponent', () => {
  let component: RegistrationDataDialogComponent;
  let fixture: ComponentFixture<RegistrationDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationDataDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
