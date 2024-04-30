import { TestBed } from '@angular/core/testing';

import { ModelsByyearService } from './models-byyear.service';

describe('ModelsByyearService', () => {
  let service: ModelsByyearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelsByyearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
