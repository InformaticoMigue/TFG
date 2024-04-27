/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpecieService } from './specie.service';

describe('Service: Specie', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecieService]
    });
  });

  it('should ...', inject([SpecieService], (service: SpecieService) => {
    expect(service).toBeTruthy();
  }));
});
