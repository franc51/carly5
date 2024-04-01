import { TestBed } from '@angular/core/testing';

import { NumberPlatesService } from './number-plates.service';

describe('NumberPlatesService', () => {
  let service: NumberPlatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberPlatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
