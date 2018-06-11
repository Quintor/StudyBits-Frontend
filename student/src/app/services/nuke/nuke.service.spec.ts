import { inject, TestBed } from '@angular/core/testing';

import { NukeService } from './nuke.service';

describe('NukeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NukeService]
    });
  });

  it('should be created', inject([NukeService], (service: NukeService) => {
    expect(service).toBeTruthy();
  }));
});
