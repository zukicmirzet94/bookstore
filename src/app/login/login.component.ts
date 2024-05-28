import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { LoginRequest } from '../utils/interfaces';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { StorageService } from '../services/auth/storage.service';
import { mapRoleToEnum } from '../utils/enums';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, InputTextModule, FloatLabelModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginRequest: LoginRequest = {
    username: '',
    password: ''
  };
  public loginError = false;
  constructor(private userService: UserService, private storageService: StorageService, private router: Router) {

  }

  ngOnInit() {
    this.storageService.cleanStorage();
  }
  
  login() {
    this.userService.login(this.loginRequest).subscribe(loggedUser => {
      if (!loggedUser) {
        this.loginError = true;
      } else {
        this.loginError = false;
        this.storageService.setToken(environment.token);
        const role = mapRoleToEnum(loggedUser.role || '');
        this.storageService.setRole(role);
        this.router.navigate(['/dashboard']);
      }
    })
  }

  register() {
    this.router.navigate(['/register']);
  }
}
