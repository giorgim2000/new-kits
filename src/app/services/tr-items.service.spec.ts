import { TestBed } from '@angular/core/testing';

import { TrItemsService } from './tr-items.service';

describe('TrItemsService', () => {
  let service: TrItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
