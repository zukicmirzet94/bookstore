import { Injectable } from '@angular/core';
import { Role } from 'src/app/utils/enums';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  cleanToken() {
    localStorage.removeItem('access_token');
  }

  setRole(role: Role) {
    localStorage.setItem('role', role);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  cleanRole() {
    return localStorage.removeItem('role');
  }

  cleanStorage() {
    this.cleanRole();
    this.cleanToken();
  }
  
}
