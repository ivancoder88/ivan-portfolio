import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LanguageService } from '../../services/language.service';

interface Project {
  title: string;
  category: string;
}

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [SectionHeader, Section, RevealDirective],
  template: `
    <app-section id="works">
      <app-section-header [title]="lang.t().works.title" />

      @if (projects().length > 0) {
        <div class="grid md:grid-cols-2 gap-8">
          @for (project of projects(); track project.title; let i = $index) {
            <div 
              appReveal
              class="group relative overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800" 
              [style.transition-delay]="i * 150 + 'ms'"
            >
              <div class="aspect-video w-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-20 h-20">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span class="text-primary text-sm font-bold mb-1">{{ project.category }}</span>
                <h3 class="text-white text-2xl font-bold">{{ project.title }}</h3>
              </div>
            </div>
          }
        </div>
      } @else {
        <div appReveal class="flex flex-col items-center justify-center py-24 gap-6 text-center">
          <div class="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{{ lang.t().works.comingSoonTitle }}</h3>
          <p class="text-slate-500 dark:text-slate-400 max-w-md">{{ lang.t().works.comingSoonDescription }}</p>
        </div>
      }
    </app-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Works {
  protected readonly lang = inject(LanguageService);

  protected readonly projects = computed<Project[]>(() => this.lang.t().works.items);
}
