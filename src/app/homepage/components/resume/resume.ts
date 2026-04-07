import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LanguageService } from '../../services/language.service';

interface ResumeItem {
  year: string;
  title: string;
  place: string;
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [SectionHeader, Section, RevealDirective],
  template: `
    <app-section id="resume" variant="slate">
      <app-section-header [title]="lang.t().resume.title" />

      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Experience -->
        <div>
          <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-4" appReveal>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-primary">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H18.75m-15 0a2.25 2.25 0 00-2.25 2.25H5.25m15 0V11.75c0-.621-.504-1.125-1.125-1.125h-4.375c-.621 0-1.125.504-1.125 1.125v1.4m-1.5 1.5l1.5-1.5m0 0l-1.5-1.5m1.5 1.5H10.5M5.25 10.5h13.5" />
            </svg>
            {{ lang.t().resume.experience }}
          </h3>
          <div class="space-y-8">
            @for (item of experience(); track item.title; let i = $index) {
              <div 
                appReveal
                class="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all" 
                [style.transition-delay]="i * 100 + 'ms'"
              >
                <span class="text-primary font-bold mb-2 block uppercase tracking-wider">{{ item.year }}</span>
                <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-1">{{ item.title }}</h4>
                <p class="text-slate-600 dark:text-slate-400 font-medium">{{ item.place }}</p>
              </div>
            }
          </div>
        </div>

        <!-- Education -->
        <div>
          <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-4" appReveal>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-primary">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147L12 14.654l7.74-4.507a.75.75 0 01.76 1.288l-8 4.663a.75.75 0 01-.76 0l-8-4.663a.75.75 0 01.76-1.288z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 5.487L12 9.994l7.74-4.507a.75.75 0 01.76 1.288l-8 4.663a.75.75 0 01-.76 0l-8-4.663a.75.75 0 01.76-1.288z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 14.807L12 19.314l7.74-4.507a.75.75 0 01.76 1.288l-8 4.663a.75.75 0 01-.76 0l-8-4.663a.75.75 0 01.76-1.288z" />
            </svg>
            {{ lang.t().resume.education }}
          </h3>
          <div class="space-y-8">
            @for (item of education(); track item.title; let i = $index) {
              <div 
                appReveal
                class="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all" 
                [style.transition-delay]="i * 100 + 'ms'"
              >
                <span class="text-primary font-bold mb-2 block uppercase tracking-wider">{{ item.year }}</span>
                <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-1">{{ item.title }}</h4>
                <p class="text-slate-600 dark:text-slate-400 font-medium">{{ item.place }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </app-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Resume {
  protected readonly lang = inject(LanguageService);

  protected readonly experience = computed<ResumeItem[]>(() => this.lang.t().resume.experienceItems);
  protected readonly education = computed<ResumeItem[]>(() => this.lang.t().resume.educationItems);
}
