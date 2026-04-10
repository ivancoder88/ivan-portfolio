import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div class="w-full max-w-md">

        <div class="text-center mb-8">
          <div class="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Create Account</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1 text-sm">Register a new dashboard account</p>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
          <form class="space-y-5" (ngSubmit)="submit()">

            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Username</label>
              <input
                [(ngModel)]="username" name="username"
                type="text" placeholder="Choose a username"
                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Password</label>
              <input
                [(ngModel)]="password" name="password"
                type="password" placeholder="Choose a password"
                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Confirm Password</label>
              <input
                [(ngModel)]="confirmPassword" name="confirmPassword"
                type="password" placeholder="Repeat your password"
                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            @if (error()) {
              <p class="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                {{ error() }}
              </p>
            }
            @if (success()) {
              <p class="text-green-600 text-sm bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3">
                Account created! Redirecting to login...
              </p>
            }

            <button
              type="submit"
              [disabled]="loading() || success()"
              class="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {{ loading() ? 'Creating account...' : 'Create Account' }}
            </button>
          </form>
        </div>

        <p class="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Already have an account?
          <a routerLink="/dashboard/login" class="text-primary font-semibold hover:underline ml-1">Sign in</a>
        </p>

      </div>
    </div>
  `,
})
export class Register {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected username = '';
  protected password = '';
  protected confirmPassword = '';
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly success = signal(false);

  protected submit(): void {
    if (!this.username || !this.password || !this.confirmPassword) {
      this.error.set('Please fill in all fields.');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error.set('Passwords do not match.');
      return;
    }
    if (this.password.length < 6) {
      this.error.set('Password must be at least 6 characters.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.auth.register(this.username, this.password).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
        setTimeout(() => this.router.navigate(['/dashboard/login']), 1500);
      },
      error: (err) => {
        this.error.set(err.error?.error ?? 'Registration failed. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
