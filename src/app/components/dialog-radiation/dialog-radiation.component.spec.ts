import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRadiationComponent } from './dialog-radiation.component';

describe('DialogRadiationComponent', () => {
  let component: DialogRadiationComponent;
  let fixture: ComponentFixture<DialogRadiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogRadiationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogRadiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
