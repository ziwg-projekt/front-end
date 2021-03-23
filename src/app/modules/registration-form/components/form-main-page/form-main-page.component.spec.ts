import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMainPageComponent } from './form-main-page.component';

describe('FormMainPageComponent', () => {
  let component: FormMainPageComponent;
  let fixture: ComponentFixture<FormMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
