import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from 'src/app/app.config';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedUser = false;
  public user = '';
  constructor(private router: Router,
    public jwtHelper: JwtHelperService,
    private storageService: StorageService
  ) { }
  
  public isAuthenticated(): boolean {
    let token = tokenGetter();
    const isValidToken = !this.jwtHelper.isTokenExpired(token);
    return isValidToken;
  }

  public logout() {
    this.storageService.cleanStorage();
    this.router.navigate(['/login']);
  }
}
