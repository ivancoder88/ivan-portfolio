import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebar, NavItem } from './sidebar/sidebar';
import { DashboardTopbar } from './topbar/topbar';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, DashboardSidebar, DashboardTopbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-slate-100 dark:bg-slate-900 flex">
      <app-dashboard-sidebar [collapsed]="collapsed()" [navItems]="navItems" />

      <div
        class="flex-1 flex flex-col transition-all duration-300"
        [class.ml-64]="!collapsed()"
        [class.ml-16]="collapsed()"
      >
        <app-dashboard-topbar (toggleCollapse)="collapsed.update(v => !v)" />
        <main class="flex-1 p-6">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class Dashboard {
  protected readonly collapsed = signal(false);

  protected readonly navItems: NavItem[] = [
    {
      label: 'Overview',
      path: '/dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      label: 'Page Customization',
      path: '/dashboard/page-customization',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    },
    {
      label: 'Messages',
      path: '/dashboard/messages',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
  ];
}
