import { TestBed } from '@angular/core/testing';

import { CurrentTransitionServiceService } from './current-transition-service.service';

describe('CurrentTransitionServiceService', () => {
  let service: CurrentTransitionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentTransitionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
