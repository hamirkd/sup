import { TestBed } from '@angular/core/testing';

import { ClasseproviderService } from './classeprovider.service';

describe('ClasseproviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClasseproviderService = TestBed.get(ClasseproviderService);
    expect(service).toBeTruthy();
  });
});
