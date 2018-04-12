import { inject, TestBed } from '@angular/core/testing';

import { ProofRequestService } from './proof-request.service';

describe('ProofRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProofRequestService]
    });
  });

  it('should be created', inject([ProofRequestService], (service: ProofRequestService) => {
    expect(service).toBeTruthy();
  }));
});
