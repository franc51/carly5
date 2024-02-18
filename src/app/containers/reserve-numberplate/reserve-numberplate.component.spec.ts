import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveNumberplateComponent } from './reserve-numberplate.component';

describe('ReserveNumberplateComponent', () => {
  let component: ReserveNumberplateComponent;
  let fixture: ComponentFixture<ReserveNumberplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveNumberplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReserveNumberplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
