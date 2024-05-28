import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { StorageService } from "../storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    const isAuthUser = this.authService.isAuthenticated();
    if (isAuthUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}