import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type TimelineItemType = 'software' | 'engineering' | 'other';

const TYPE_COLOR: Record<string, string> = {
  software: 'bg-primary',
  engineering: 'bg-emerald-500',
  other: 'bg-slate-400',
};

@Component({
  selector: 'app-timeline-item-card',
  template: `
    <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div class="flex items-start gap-3 mb-3">
        <div [class]="dotColor()" class="w-2 h-2 rounded-full mt-2 shrink-0"></div>
        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight">{{ title() }}</h3>
          <p class="text-primary font-semibold text-sm">{{ company() }}</p>
          <p class="text-slate-400 text-xs mt-0.5">{{ location() }}</p>
        </div>
      </div>
      <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{{ description() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemCard {
  readonly title = input.required<string>();
  readonly company = input.required<string>();
  readonly location = input.required<string>();
  readonly description = input.required<string>();
  readonly type = input.required<string>();

  protected readonly dotColor = computed(() => TYPE_COLOR[this.type()] ?? 'bg-slate-400');
}
