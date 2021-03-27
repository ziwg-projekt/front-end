import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMapStageComponent } from './form-map-stage.component';

describe('FormMapStageComponent', () => {
  let component: FormMapStageComponent;
  let fixture: ComponentFixture<FormMapStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMapStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMapStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
