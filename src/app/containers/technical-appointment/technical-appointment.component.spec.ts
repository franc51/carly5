import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalAppointmentComponent } from './technical-appointment.component';

describe('TechnicalAppointmentComponent', () => {
  let component: TechnicalAppointmentComponent;
  let fixture: ComponentFixture<TechnicalAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechnicalAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechnicalAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
