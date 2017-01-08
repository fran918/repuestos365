/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormplacaService } from './formplaca.service';

describe('FormplacaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormplacaService]
    });
  });

  it('should ...', inject([FormplacaService], (service: FormplacaService) => {
    expect(service).toBeTruthy();
  }));
});
