/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdoptionService } from './sponsor.service';

describe('Service: Adoption', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdoptionService]
    });
  });

  it('should ...', inject([AdoptionService], (service: AdoptionService) => {
    expect(service).toBeTruthy();
  }));
});
