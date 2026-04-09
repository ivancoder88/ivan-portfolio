import { ChangeDetectionStrategy, Component, inject, computed, signal } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LanguageService } from '../../services/language.service';

interface TimelineItem {
  year: string;
  endYear: string;
  title: string;
  company: string;
  location: string;
  type: 'software' | 'engineering' | 'other';
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [SectionHeader, Section, RevealDirective],
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
        <!-- Vertical line -->
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700 md:-translate-x-px"></div>

        <div class="space-y-10">
          @for (item of filteredItems(); track item.title; let i = $index; let isEven = $even) {
            <div
              appReveal
              [style.transition-delay]="i * 80 + 'ms'"
              class="relative grid md:grid-cols-2 gap-6 md:gap-12"
            >
              <!-- Dot on the line -->
              <div
                [class]="dotClass(item.type)"
                class="absolute left-4 md:left-1/2 top-6 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 -translate-x-1/2 z-10 shadow"
              ></div>

              <!-- Year badge — left side on desktop for even, right for odd -->
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

              <!-- Card — right side on desktop for even, left for odd -->
              <div [class]="isEven ? 'pl-12 md:pl-12' : 'pl-12 md:pr-12 md:order-first'">
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div class="flex items-start gap-3 mb-3">
                    <div [class]="badgeClass(item.type)" class="w-2 h-2 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight">{{ item.title }}</h3>
                      <p class="text-primary font-semibold text-sm">{{ item.company }}</p>
                      <p class="text-slate-400 text-xs mt-0.5">{{ item.location }}</p>
                    </div>
                  </div>
                  <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{{ item.description }}</p>
                </div>
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
  protected readonly activeFilter = signal<'all' | 'software' | 'engineering' | 'other'>('all');

  protected readonly filters = [
    { label: 'All', value: 'all' as const },
    { label: 'Software', value: 'software' as const },
    { label: 'Engineering', value: 'engineering' as const },
    { label: 'Other', value: 'other' as const },
  ];

  protected readonly filteredItems = computed<TimelineItem[]>(() => {
    const items = this.lang.t().timeline.items as TimelineItem[];
    const filter = this.activeFilter();
    return filter === 'all' ? items : items.filter(i => i.type === filter);
  });

  protected dotClass(type: string): string {
    const map: Record<string, string> = {
      software: 'bg-primary',
      engineering: 'bg-emerald-500',
      other: 'bg-slate-400',
    };
    return map[type] ?? 'bg-slate-400';
  }

  protected badgeClass(type: string): string {
    const map: Record<string, string> = {
      software: 'bg-primary',
      engineering: 'bg-emerald-500',
      other: 'bg-slate-400',
    };
    return map[type] ?? 'bg-slate-400';
  }
}
