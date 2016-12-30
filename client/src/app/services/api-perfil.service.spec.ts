/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { apiPerfilService } from './api-perfil.service';

describe('apiPerfilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [apiPerfilService]
    });
  });

  it('should ...', inject([apiPerfilService], (service: apiPerfilService) => {
    expect(service).toBeTruthy();
  }));
});
