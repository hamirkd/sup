import { TestBed } from '@angular/core/testing';

import { RoleproviderService } from './roleprovider.service';

describe('RoleproviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleproviderService = TestBed.get(RoleproviderService);
    expect(service).toBeTruthy();
  });
});
