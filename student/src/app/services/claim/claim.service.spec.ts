import { inject, TestBed } from '@angular/core/testing';

import { ClaimService } from './claim.service';

describe('ClaimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClaimService]
    });
  });

  it('should be created', inject([ClaimService], (service: ClaimService) => {
    expect(service).toBeTruthy();
  }));
});
