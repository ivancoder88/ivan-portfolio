import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/auth.service';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside
      class="fixed inset-y-0 left-0 z-40 flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300"
      [class.w-64]="!collapsed()"
      [class.w-16]="collapsed()"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3 px-4 h-16 border-b border-slate-200 dark:border-slate-700 overflow-hidden">
        <div class="w-8 h-8 bg-primary rounded-lg shrink-0 flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        @if (!collapsed()) {
          <span class="font-bold text-slate-900 dark:text-white whitespace-nowrap">Dashboard</span>
        }
      </div>

      <!-- Nav -->
      <nav class="flex-1 py-4 space-y-1 px-2 overflow-hidden" aria-label="Dashboard navigation">
        @for (item of navItems(); track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-primary/10 text-primary"
            [routerLinkActiveOptions]="{ exact: item.path === '/dashboard' }"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all font-medium"
          >
            <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
            <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0" aria-hidden="true">
              <span class="text-primary font-bold text-sm">{{ (auth.username() ?? 'U')[0].toUpperCase() }}</span>
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{{ auth.username() }}</span>
          </div>
        }
        <button
          (click)="auth.logout()"
          class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all font-medium"
        >
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          @if (!collapsed()) {
            <span class="whitespace-nowrap">Sign Out</span>
          }
        </button>
      </div>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSidebar {
  protected readonly auth = inject(AuthService);
  readonly collapsed = input.required<boolean>();
  readonly navItems = input.required<NavItem[]>();
}
