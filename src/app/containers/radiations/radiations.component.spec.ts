import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiationsComponent } from './radiations.component';

describe('RadiationsComponent', () => {
  let component: RadiationsComponent;
  let fixture: ComponentFixture<RadiationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadiationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadiationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
