import { TestBed } from '@angular/core/testing';

import { CafetriaserviceService } from './cafetriaservice.service';

describe('CafetriaserviceService', () => {
  let service: CafetriaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CafetriaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
