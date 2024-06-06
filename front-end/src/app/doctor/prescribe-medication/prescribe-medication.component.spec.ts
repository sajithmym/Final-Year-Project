import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescribeMedicationComponent } from './prescribe-medication.component';

describe('PrescribeMedicationComponent', () => {
  let component: PrescribeMedicationComponent;
  let fixture: ComponentFixture<PrescribeMedicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescribeMedicationComponent]
    });
    fixture = TestBed.createComponent(PrescribeMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
