import { ChangeDetectionStrategy, Component, inject, computed, input } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LanguageService } from '../../services/language.service';
import { ResumeCard } from './resume-card';

interface ResumeItem {
  year: string;
  title: string;
  place: string;
}

@Component({
  selector: 'app-resume-column',
  imports: [RevealDirective, ResumeCard],
  template: `
    <div>
      <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-4" appReveal>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-primary">
          <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="iconPath()" />
        </svg>
        {{ heading() }}
      </h3>
      <div class="space-y-8">
        @for (item of items(); track item.title; let i = $index) {
          <div appReveal [style.transition-delay]="i * 100 + 'ms'">
            <app-resume-card [year]="item.year" [title]="item.title" [place]="item.place" />
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeColumn {
  readonly heading = input.required<string>();
  readonly items = input.required<ResumeItem[]>();
  readonly iconPath = input.required<string>();
}

@Component({
  selector: 'app-resume',
  imports: [SectionHeader, Section, ResumeColumn],
  template: `
    <app-section id="resume" variant="slate">
      <app-section-header [title]="lang.t().resume.title" />
      <div class="grid lg:grid-cols-2 gap-16">
        <app-resume-column
          [heading]="lang.t().resume.experience"
          [items]="experience()"
          iconPath="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H18.75m-15 0a2.25 2.25 0 00-2.25 2.25H5.25m15 0V11.75c0-.621-.504-1.125-1.125-1.125h-4.375c-.621 0-1.125.504-1.125 1.125v1.4m-1.5 1.5l1.5-1.5m0 0l-1.5-1.5m1.5 1.5H10.5M5.25 10.5h13.5"
        />
        <app-resume-column
          [heading]="lang.t().resume.education"
          [items]="education()"
          iconPath="M4.26 10.147L12 14.654l7.74-4.507a.75.75 0 01.76 1.288l-8 4.663a.75.75 0 01-.76 0l-8-4.663a.75.75 0 01.76-1.288z M4.26 5.487L12 9.994l7.74-4.507a.75.75 0 01.76 1.288l-8 4.663a.75.75 0 01-.76 0l-8-4.663a.75.75 0 01.76-1.288z M4.26 14.807L12 19.314l7.74-4.507a.75.75 0 01.76 1.288l-8 4.663a.75.75 0 01-.76 0l-8-4.663a.75.75 0 01.76-1.288z"
        />
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
