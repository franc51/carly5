import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiationHistoryComponent } from './radiation-history.component';

describe('RadiationHistoryComponent', () => {
  let component: RadiationHistoryComponent;
  let fixture: ComponentFixture<RadiationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadiationHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadiationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
