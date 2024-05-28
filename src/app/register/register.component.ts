import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRequest } from '../utils/interfaces';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { UserService } from '../services/user.service';
import { getRandomNum } from '../utils/helpers';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Router } from '@angular/router';
import { Role } from '../utils/enums';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonModule, CardModule, InputTextModule, FloatLabelModule, RadioButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public registerForm = this.formBuilder.group({
    id: '',
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rePassword: ['', [Validators.required]],
    role: [Role.USER]
  }, { validator: this.passwordMatchValidator });
  public roles: string[] = [];
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.roles = Object.values(Role).filter(role => role !== Role.UNAUTHORIZED);
  }
 
  register() {
    let body: RegisterRequest = this.registerForm.getRawValue();
    body.id = getRandomNum();
    if (this.registerForm.valid) {
      this.userService.register(body).subscribe(registeredUser => {
        if (registeredUser && registeredUser.id) {
          this.router.navigate(['/login']);
        }
      })
    }
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const rePassword = control.get('rePassword');
    return password && rePassword && password.value !== rePassword.value ? { 'passwordMismatch': true } : null;
  }

  hasRequiredError(fieldName: string) {
    const errors = this.registerForm.get(fieldName)?.errors;
    if (errors) {
      return errors['required'];
    }
    return false;
  }
}
