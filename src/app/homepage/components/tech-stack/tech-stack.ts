import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LanguageService } from '../../services/language.service';
import { AppIcon, IconName } from '../icon/icon';

interface TechCategory {
  name: string;
  items: string[];
}

const CATEGORY_ICON_MAP: Record<string, IconName> = {
  'Frontend': 'frontend',
  'Backend': 'backend',
  'Practices': 'practices',
  'Prakse': 'practices',
  'Tools & Infra': 'tools',
  'Alati i infrastruktura': 'tools',
};

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [SectionHeader, Section, RevealDirective, AppIcon],
  template: `
    <app-section id="testimonials">
      <app-section-header [title]="lang.t().techStack.title" />

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        @for (category of categories(); track category.name; let i = $index) {
          <div
            appReveal
            [style.transition-delay]="i * 100 + 'ms'"
            class="flex flex-col gap-4"
          >
            <!-- Category header -->
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <app-icon [name]="categoryIcon(category.name)" class="w-5 h-5" />
              </div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ category.name }}</h3>
            </div>

            <!-- Tech items -->
            <div class="flex flex-col gap-2">
              @for (item of category.items; track item; let j = $index) {
                <div
                  appReveal
                  [style.transition-delay]="(i * 100 + j * 50) + 'ms'"
                  class="group flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-primary/5 dark:hover:bg-primary/10 px-4 py-3 rounded-xl transition-all duration-200 cursor-default"
                >
                  <span class="w-2 h-2 rounded-full bg-primary shrink-0 group-hover:scale-125 transition-transform"></span>
                  <span class="text-slate-700 dark:text-slate-300 font-medium text-sm">{{ item }}</span>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </app-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStack {
  protected readonly lang = inject(LanguageService);

  protected readonly categories = computed<TechCategory[]>(() => this.lang.t().techStack.categories as TechCategory[]);

  protected categoryIcon(name: string): IconName {
    return CATEGORY_ICON_MAP[name] ?? 'tools';
  }
}
