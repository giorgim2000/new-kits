import { TestBed } from '@angular/core/testing';

import { FinaSyncService } from './fina-sync.service';

describe('FinaSyncService', () => {
  let service: FinaSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinaSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
