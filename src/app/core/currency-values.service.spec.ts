import { TestBed } from '@angular/core/testing';

import { CurrencyValuesService } from './currency-values.service';

describe('CurrencyValuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyValuesService = TestBed.get(CurrencyValuesService);
    expect(service).toBeTruthy();
  });
});
