import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div class="w-full max-w-md">

        <div class="text-center mb-8">
          <div class="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Login</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1 text-sm">Sign in to manage your portfolio</p>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
          <form class="space-y-5" (ngSubmit)="submit()">

            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Username</label>
              <input
                [(ngModel)]="username" name="username"
                type="text" placeholder="Enter your username"
                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Password</label>
              <input
                [(ngModel)]="password" name="password"
                type="password" placeholder="Enter your password"
                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            @if (error()) {
              <p class="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                {{ error() }}
              </p>
            }

            <button
              type="submit"
              [disabled]="loading()"
              class="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {{ loading() ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>
        </div>

        <p class="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Don't have an account?
          <a routerLink="/dashboard/register" class="text-primary font-semibold hover:underline ml-1">Register</a>
        </p>

      </div>
    </div>
  `,
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected username = '';
  protected password = '';
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected submit(): void {
    if (!this.username || !this.password) {
      this.error.set('Please fill in all fields.');
      return;
    }
    this.loading.set(true);
    this.error.set(null);

    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error.set(err.error?.error ?? 'Login failed. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
