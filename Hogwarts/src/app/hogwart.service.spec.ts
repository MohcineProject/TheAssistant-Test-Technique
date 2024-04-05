import { TestBed } from '@angular/core/testing';

import { HogwartService } from './hogwart.service';

describe('HogwartService', () => {
  let service: HogwartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HogwartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
