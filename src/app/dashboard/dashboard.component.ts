import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/auth/storage.service';
import { Role } from '../utils/enums';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public isUnauthorized = false;
  public menuItems: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.authService.logout();
      }
    }
  ];
  constructor(private router: Router, private storageService: StorageService, private authService: AuthService) {

  }

  ngOnInit() {
    this.redirect();
  }

  redirect() {
    const userRole = this.storageService.getRole();
    if (userRole === Role.ADMIN) {
      this.router.navigate(['/dashboard/admin'])
    } else if (userRole === Role.USER) {
      this.router.navigate(['/dashboard/user'])
    } else {
      this.isUnauthorized = true;
      setTimeout(() => {
        this.storageService.cleanToken();
        this.router.navigate(['/login'])
      }, 3000)
    }
  }
}
