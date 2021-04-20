import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationInfoDialogComponent } from './registration-info-dialog.component';

describe('RegistrationInfoDialogComponent', () => {
  let component: RegistrationInfoDialogComponent;
  let fixture: ComponentFixture<RegistrationInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
