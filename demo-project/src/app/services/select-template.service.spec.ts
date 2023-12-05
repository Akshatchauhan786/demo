import { TestBed } from '@angular/core/testing';

import { SelectTemplateService } from './select-template.service';

describe('SelectTemplateService', () => {
  let service: SelectTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
