import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-resume-card',
  template: `
    <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
      <span class="text-primary font-bold mb-2 block uppercase tracking-wider">{{ year() }}</span>
      <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-1">{{ title() }}</h4>
      <p class="text-slate-600 dark:text-slate-400 font-medium">{{ place() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeCard {
  readonly year = input.required<string>();
  readonly title = input.required<string>();
  readonly place = input.required<string>();
}
