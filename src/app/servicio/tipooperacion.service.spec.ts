import { TestBed } from '@angular/core/testing';

import { TipooperacionService } from './tipooperacion.service';

describe('TipooperacionService', () => {
  let service: TipooperacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipooperacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
