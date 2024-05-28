import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../services/auth/storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth/auth.service';
import { Role } from '../utils/enums';
import { DashboardModule } from './dashboard.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from '../app.config';
import { LoginComponent } from '../login/login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;
  let storageService: StorageService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([
        {
          path: 'login',
          component: LoginComponent
        }
      ]), DashboardModule, HttpClientTestingModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter
        }
      })
      ],
      providers: [StorageService, JwtHelperService]
    }).compileComponents();

    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    component = new DashboardComponent(router, storageService, authService);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call redirect method on ngOnInit', () => {
    jest.spyOn(component, 'redirect');
    component.ngOnInit();
    expect(component.redirect).toHaveBeenCalled();
  });

  it('should navigate to admin dashboard for ADMIN role', () => {
    jest.spyOn(storageService, 'getRole').mockReturnValue(Role.ADMIN);
    jest.spyOn(router, 'navigate');;

    component.redirect();

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/admin']);
  });

  it('should navigate to user dashboard for USER role', () => {
    jest.spyOn(storageService, 'getRole').mockReturnValue(Role.USER);
    jest.spyOn(router, 'navigate');;

    component.redirect();

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/user']);
  });

  it('should navigate to login page for unauthorized user', fakeAsync(() => {
    jest.spyOn(storageService, 'getRole').mockReturnValue(Role.UNAUTHORIZED);
    jest.spyOn(router, 'navigate');;
    component.redirect();
    expect(component.isUnauthorized).toBeTruthy();
    tick(3000);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));
});
