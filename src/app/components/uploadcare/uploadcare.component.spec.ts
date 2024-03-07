import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcareComponent } from './uploadcare.component';

describe('UploadcareComponent', () => {
  let component: UploadcareComponent;
  let fixture: ComponentFixture<UploadcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadcareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
