import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConfirmComponent } from './patient-confirm.component';

describe('PatientConfirmComponent', () => {
  let component: PatientConfirmComponent;
  let fixture: ComponentFixture<PatientConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
