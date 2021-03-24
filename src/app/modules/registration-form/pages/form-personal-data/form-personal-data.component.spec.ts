import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPersonalDataComponent } from './form-personal-data.component';

describe('FormPersonalDataComponent', () => {
  let component: FormPersonalDataComponent;
  let fixture: ComponentFixture<FormPersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPersonalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
