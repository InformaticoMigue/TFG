/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ZooServiceService } from './zoo-service.service';

describe('Service: ZooService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZooServiceService]
    });
  });

  it('should ...', inject([ZooServiceService], (service: ZooServiceService) => {
    expect(service).toBeTruthy();
  }));
});
