import { TestBed } from '@angular/core/testing';

import { UsuariosGetService } from './usuarios-get.service';

describe('UsuariosGetService', () => {
  let service: UsuariosGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
