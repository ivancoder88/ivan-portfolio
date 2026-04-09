import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './core/auth.service';

interface NavItem { label: string; path: string; icon: string; }

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-slate-100 dark:bg-slate-900 flex">

      <!-- Sidebar -->
      <aside
        class="fixed inset-y-0 left-0 z-40 flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300"
        [class.w-64]="!collapsed()"
        [class.w-16]="collapsed()"
      >
        <!-- Logo -->
        <div class="flex items-center gap-3 px-4 h-16 border-b border-slate-200 dark:border-slate-700 overflow-hidden">
          <div class="w-8 h-8 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          @if (!collapsed()) {
            <span class="font-bold text-slate-900 dark:text-white whitespace-nowrap">Dashboard</span>
          }
        </div>

        <!-- Nav -->
        <nav class="flex-1 py-4 space-y-1 px-2 overflow-hidden">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="bg-primary/10 text-primary"
              [routerLinkActiveOptions]="{ exact: item.path === '/dashboard' }"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all font-medium"
            >
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="item.icon" />
              </svg>
              @if (!collapsed()) {
                <span class="whitespace-nowrap">{{ item.label }}</span>
              }
            </a>
          }
        </nav>

        <!-- User + Logout -->
        <div class="border-t border-slate-200 dark:border-slate-700 p-3 overflow-hidden">
          @if (!collapsed()) {
            <div class="flex items-center gap-3 px-2 py-2 mb-1">
              <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-primary font-bold text-sm">{{ (auth.username() ?? 'U')[0].toUpperCase() }}</span>
              </div>
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{{ auth.username() }}</span>
            </div>
          }
          <button
            (click)="auth.logout()"
            class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all font-medium"
          >
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            @if (!collapsed()) {
              <span class="whitespace-nowrap">Sign Out</span>
            }
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <div class="flex-1 flex flex-col transition-all duration-300" [class.ml-64]="!collapsed()" [class.ml-16]="collapsed()">

        <!-- Top bar -->
        <header class="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-6 gap-4 sticky top-0 z-30">
          <button
            (click)="collapsed.update(v => !v)"
            class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span class="text-slate-900 dark:text-white font-semibold">Portfolio Manager</span>
        </header>

        <main class="flex-1 p-6">
          <router-outlet />
        </main>
      </div>

    </div>
  `,
})
export class Dashboard {
  protected readonly auth = inject(AuthService);
  protected readonly collapsed = signal(false);

  protected readonly navItems: NavItem[] = [
    { label: 'Overview', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Messages', path: '/dashboard/messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];
}
