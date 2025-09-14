import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());

  constructor() {}

  private hasToken(): boolean {
    return !!(
      localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    );
  }

  getToken(): string | null {
    return (
      localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    );
  }

  login(token: string, user: any, rememberMe: boolean = false): void {
    if (rememberMe) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('user', JSON.stringify(user));
    }
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): any {
    const userStr = sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getUserObservable(): BehaviorSubject<any> {
    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    return new BehaviorSubject<any>(user);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  updateCurrentUser(updatedUser: any): void {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === updatedUser.id) {
      const userStr = JSON.stringify(updatedUser);
      if (sessionStorage.getItem('user')) {
        sessionStorage.setItem('user', userStr);
      }
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', userStr);
      }
      this.currentUserSubject.next(updatedUser);
    }
  }
}
