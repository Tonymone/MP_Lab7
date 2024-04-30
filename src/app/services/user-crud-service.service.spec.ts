import { TestBed } from '@angular/core/testing';

import { UserCrudServiceService } from './user-crud-service.service';

describe('UserCrudServiceService', () => {
  let service: UserCrudServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCrudServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
