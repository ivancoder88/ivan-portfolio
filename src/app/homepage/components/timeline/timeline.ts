import { ChangeDetectionStrategy, Component, inject, computed, signal } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LanguageService } from '../../services/language.service';
import { TimelineItemCard } from './timeline-item-card';

interface TimelineItem {
  year: string;
  endYear: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  tags: string[];
}

type FilterValue = 'all' | 'software' | 'engineering' | 'other';

const DOT_COLOR: Record<string, string> = {
  software: 'bg-primary',
  engineering: 'bg-emerald-500',
  other: 'bg-slate-400',
};

@Component({
  selector: 'app-timeline',
  imports: [SectionHeader, Section, RevealDirective, TimelineItemCard],
  template: `
    <app-section id="works" variant="slate">
      <app-section-header [title]="lang.t().timeline.title" />

      <!-- Filter buttons -->
      <div class="flex flex-wrap gap-3 mb-12 justify-center" appReveal>
        @for (filter of filters; track filter.value) {
          <button
            (click)="activeFilter.set(filter.value)"
            [class]="activeFilter() === filter.value
              ? 'px-5 py-2 rounded-full font-bold text-sm bg-primary text-white shadow-md transition-all'
              : 'px-5 py-2 rounded-full font-bold text-sm bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-primary border border-slate-200 dark:border-slate-700 transition-all'"
          >
            {{ filter.label }}
          </button>
        }
      </div>

      <!-- Timeline -->
      <div class="relative">
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700 md:-translate-x-px"></div>

        <div class="space-y-10">
          @for (item of filteredItems(); track item.title; let i = $index; let isEven = $even) {
            <div
              appReveal
              [style.transition-delay]="i * 80 + 'ms'"
              class="relative grid md:grid-cols-2 gap-6 md:gap-12"
            >
              <!-- Dot -->
              <div
                [class]="dotColor(item.type)"
                class="absolute left-4 md:left-1/2 top-6 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 -translate-x-1/2 z-10 shadow"
              ></div>

              <!-- Year + tags -->
              <div [class]="isEven ? 'md:text-right md:pr-12 pl-12 md:pl-0' : 'md:order-last md:pl-12 pl-12'">
                <span class="inline-block text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                  {{ item.year }} — {{ item.endYear }}
                </span>
                <div class="flex flex-wrap gap-2" [class]="isEven ? 'md:justify-end' : ''">
                  @for (tag of item.tags; track tag) {
                    <span class="text-xs font-medium px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>

              <!-- Card -->
              <div [class]="isEven ? 'pl-12 md:pl-12' : 'pl-12 md:pr-12 md:order-first'">
                <app-timeline-item-card
                  [title]="item.title"
                  [company]="item.company"
                  [location]="item.location"
                  [description]="item.description"
                  [type]="item.type"
                />
              </div>
            </div>
          }
        </div>
      </div>
    </app-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Timeline {
  protected readonly lang = inject(LanguageService);
  protected readonly activeFilter = signal<FilterValue>('all');

  protected readonly filters: { label: string; value: FilterValue }[] = [
    { label: 'All', value: 'all' },
    { label: 'Software', value: 'software' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Other', value: 'other' },
  ];

  protected readonly filteredItems = computed<TimelineItem[]>(() => {
    const items = this.lang.t().timeline.items as TimelineItem[];
    const filter = this.activeFilter();
    return filter === 'all' ? items : items.filter(i => i.type === filter);
  });

  protected dotColor(type: string): string {
    return DOT_COLOR[type] ?? 'bg-slate-400';
  }
}
