import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicalHistoryComponent } from './view-medical-history.component';

describe('ViewMedicalHistoryComponent', () => {
  let component: ViewMedicalHistoryComponent;
  let fixture: ComponentFixture<ViewMedicalHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMedicalHistoryComponent]
    });
    fixture = TestBed.createComponent(ViewMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
