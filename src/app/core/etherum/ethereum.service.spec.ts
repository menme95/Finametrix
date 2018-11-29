import { TestBed } from '@angular/core/testing';

import { EthereumService } from './ethereum.service';

describe('BitcoinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EthereumService = TestBed.get(EthereumService);
    expect(service).toBeTruthy();
  });
});
