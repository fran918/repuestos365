/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { apiRepuestosService } from './api-repuestos.service';

describe('apiRepuestosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [apiRepuestosService]
    });
  });

  it('should ...', inject([apiRepuestosService], (service: apiRepuestosService) => {
    expect(service).toBeTruthy();
  }));
});
