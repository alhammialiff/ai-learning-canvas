import { TestBed } from '@angular/core/testing';

import { DeepLearningService } from './deep-learning.service';

describe('DeepLearningService', () => {
  let service: DeepLearningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepLearningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
