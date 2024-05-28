import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest, User } from '../utils/interfaces';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(body: LoginRequest): Observable<User | null> {
    return this.httpClient.get<User[]>(`${environment.BASE_URL}/users?username=${body.username}`).pipe(
      map(users => users.find(user => user.password === body.password) || null)
    );
  }

  register(body: RegisterRequest): Observable<User> {
    return this.httpClient.post<User>(`${environment.BASE_URL}/users`, body);
  }

}
