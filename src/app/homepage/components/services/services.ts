import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { AppIcon, IconName } from '../icon/icon';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface Service {
  title: string;
  description: string;
  icon: IconName;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [AppIcon, SectionHeader, Section, RevealDirective],
  template: `
    <app-section id="services" variant="slate">
      <app-section-header [title]="lang.t().services.title" />

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (service of services(); track service.title; let i = $index) {
          <div 
            appReveal
            class="group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" 
            [style.transition-delay]="i * 100 + 'ms'"
          >
            <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <app-icon [name]="service.icon" class="w-8 h-8" />
            </div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">{{ service.title }}</h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              {{ service.description }}
            </p>
            <button class="mt-6 flex items-center gap-2 font-bold text-primary group-hover:translate-x-2 transition-transform">
              {{ lang.t().services.readMore }}
              <app-icon name="arrow-right" class="w-4 h-4" />
            </button>
          </div>
        }
      </div>
    </app-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  protected readonly lang = inject(LanguageService);
  
  protected readonly services = computed<Service[]>(() => this.lang.t().services.items as Service[]);
}
