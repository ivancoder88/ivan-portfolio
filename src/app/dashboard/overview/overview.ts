import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Overview</h2>
      <p class="text-slate-500 dark:text-slate-400">Welcome to your portfolio dashboard. Use the sidebar to manage your content.</p>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (card of cards; track card.label) {
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white" [style.background]="card.color">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="card.icon" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ card.value }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ card.label }}</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class Overview {
  protected readonly cards = [
    { label: 'Projects', value: '—', color: '#8650F4', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    { label: 'Messages', value: '—', color: '#06b6d4', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: 'Skills', value: '—', color: '#10b981', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  ];
}
