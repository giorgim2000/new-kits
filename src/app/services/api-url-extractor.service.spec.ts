import { TestBed } from '@angular/core/testing';

import { ApiUrlExtractorService } from './api-url-extractor.service';

describe('ApiUrlExtractorService', () => {
  let service: ApiUrlExtractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUrlExtractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
