import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  AuthResponse,
  LoginRequest,
} from '../_models/user.model';
import { Guid } from '../_models/guid.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = `${environment.apiUrl}/Users`;
  private authUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getById(id: Guid): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  create(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  update(id: Guid, user: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/${id}`, user);
  }

  delete(id: Guid): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${id}`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/me`);
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.authUrl}/logout`, {});
  }

  // === MÉTODOS ADICIONAIS (se necessário) ===
  register(user: CreateUserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/register`, user);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/refresh`, {});
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.authUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.authUrl}/reset-password`, {
      token,
      newPassword,
    });
  }
}
