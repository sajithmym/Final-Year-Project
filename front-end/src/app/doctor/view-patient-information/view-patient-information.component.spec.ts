import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientInformationComponent } from './view-patient-information.component';

describe('ViewPatientInformationComponent', () => {
  let component: ViewPatientInformationComponent;
  let fixture: ComponentFixture<ViewPatientInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPatientInformationComponent]
    });
    fixture = TestBed.createComponent(ViewPatientInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
