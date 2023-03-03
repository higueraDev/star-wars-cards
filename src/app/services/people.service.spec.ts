import { TestBed } from '@angular/core/testing';

import { PeopleService } from './people.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeopleService],
    });
    service = TestBed.inject(PeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
