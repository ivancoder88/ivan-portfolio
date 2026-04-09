import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

interface AuthResponse { token: string; username: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _token = signal<string | null>(
    typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null
  );
  private readonly _username = signal<string | null>(
    typeof localStorage !== 'undefined' ? localStorage.getItem('auth_username') : null
  );

  readonly isLoggedIn = computed(() => !!this._token());
  readonly username = computed(() => this._username());

  login(username: string, password: string) {
    return this.http.post<AuthResponse>('/api/auth/login', { username, password }).pipe(
      tap(res => {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('auth_username', res.username);
        this._token.set(res.token);
        this._username.set(res.username);
      })
    );
  }

  register(username: string, password: string) {
    return this.http.post<{ success: boolean }>('/api/auth/register', { username, password });
  }

  logout() {
    this.http.post('/api/auth/logout', {}, {
      headers: { Authorization: `Bearer ${this._token()}` }
    }).subscribe();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_username');
    this._token.set(null);
    this._username.set(null);
    this.router.navigate(['/dashboard/login']);
  }

  getToken() {
    return this._token();
  }
}
