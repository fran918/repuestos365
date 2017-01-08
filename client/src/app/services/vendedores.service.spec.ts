/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VendedoresService } from './vendedores.service';

describe('VendedoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendedoresService]
    });
  });

  it('should ...', inject([VendedoresService], (service: VendedoresService) => {
    expect(service).toBeTruthy();
  }));
});
