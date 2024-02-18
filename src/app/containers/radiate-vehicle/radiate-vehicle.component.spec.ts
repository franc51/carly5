import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiateVehicleComponent } from './radiate-vehicle.component';

describe('RadiateVehicleComponent', () => {
  let component: RadiateVehicleComponent;
  let fixture: ComponentFixture<RadiateVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadiateVehicleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadiateVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
