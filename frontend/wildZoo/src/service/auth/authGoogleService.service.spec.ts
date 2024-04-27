/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGoogleServiceService } from './authGoogleService.service';

describe('Service: AuthGoogleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGoogleServiceService]
    });
  });

  it('should ...', inject([AuthGoogleServiceService], (service: AuthGoogleServiceService) => {
    expect(service).toBeTruthy();
  }));
});
