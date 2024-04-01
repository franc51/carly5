import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveContainerComponent } from './reserve-container.component';

describe('ReserveContainerComponent', () => {
  let component: ReserveContainerComponent;
  let fixture: ComponentFixture<ReserveContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReserveContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
