import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(SnackBarService);
  });

  it('when start than should be initialized', () => {
    expect(service).toBeTruthy();
  });
});
