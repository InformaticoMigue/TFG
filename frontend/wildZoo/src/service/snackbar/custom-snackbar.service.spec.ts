/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomSnackbarService } from './custom-snackbar.service';

describe('Service: CustomSnackbar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomSnackbarService]
    });
  });

  it('should ...', inject([CustomSnackbarService], (service: CustomSnackbarService) => {
    expect(service).toBeTruthy();
  }));
});
