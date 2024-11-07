import { TestBed } from '@angular/core/testing';

import { MsalInitializerService } from './msal-initializer.service';

describe('MsalInitializerService', () => {
  let service: MsalInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsalInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
