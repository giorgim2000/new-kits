import { TestBed } from '@angular/core/testing';

import { ModelByYearService } from './model-by-year.service';

describe('ModelByYearService', () => {
  let service: ModelByYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelByYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
