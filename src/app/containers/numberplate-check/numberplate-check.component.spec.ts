import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberplateCheckComponent } from './numberplate-check.component';

describe('NumberplateCheckComponent', () => {
  let component: NumberplateCheckComponent;
  let fixture: ComponentFixture<NumberplateCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberplateCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberplateCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
