import { TestBed, inject } from '@angular/core/testing';

import { Covid19dataService } from './covid19data.service';

describe('Covid19dataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Covid19dataService]
    });
  });

  it('should be created', inject([Covid19dataService], (service: Covid19dataService) => {
    expect(service).toBeTruthy();
  }));
});
