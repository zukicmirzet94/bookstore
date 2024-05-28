import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "../auth.service";
import { StorageService } from "../storage.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(private authService: AuthService, private storageService: StorageService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = route.data['accessRole'];
    const isMatchedRole = role === this.storageService.getRole();
    if (!isMatchedRole) {
      this.authService.logout();
      return isMatchedRole;
    }
    return isMatchedRole;
  }
}