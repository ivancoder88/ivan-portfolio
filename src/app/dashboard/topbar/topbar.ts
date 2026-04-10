import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-dashboard-topbar',
  imports: [],
  template: `
    <header class="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-6 gap-4 sticky top-0 z-30">
      <button
        (click)="toggleCollapse.emit()"
        class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        aria-label="Toggle sidebar"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <span class="text-slate-900 dark:text-white font-semibold">Portfolio Manager</span>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTopbar {
  readonly toggleCollapse = output<void>();
}
