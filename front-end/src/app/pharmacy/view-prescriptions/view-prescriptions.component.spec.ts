import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrescriptionsComponent } from './view-prescriptions.component';

describe('ViewPrescriptionsComponent', () => {
  let component: ViewPrescriptionsComponent;
  let fixture: ComponentFixture<ViewPrescriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPrescriptionsComponent]
    });
    fixture = TestBed.createComponent(ViewPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
