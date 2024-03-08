import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplepaginatorComponent } from './simplepaginator.component';

describe('SimplepaginatorComponent', () => {
  let component: SimplepaginatorComponent;
  let fixture: ComponentFixture<SimplepaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimplepaginatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimplepaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
