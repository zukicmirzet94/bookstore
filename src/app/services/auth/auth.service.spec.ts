import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from 'src/app/app.config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtHelperService],
      imports: [
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter
          }
        })
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
