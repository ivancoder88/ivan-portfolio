import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LanguageService } from '../../services/language.service';

interface Testimonial {
  name: string;
  role: string;
  content: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [SectionHeader, Section, RevealDirective],
  template: `
    <app-section id="testimonials" variant="slate">
      <app-section-header [title]="lang.t().testimonials.title" />

      @if (testimonials().length > 0) {
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (testimonial of testimonials(); track testimonial.name; let i = $index) {
            <div 
              appReveal
              class="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500" 
              [style.transition-delay]="i * 100 + 'ms'"
            >
              <div class="flex gap-1 mb-6 text-primary">
                @for (star of [1,2,3,4,5]; track star) {
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                  </svg>
                }
              </div>
              <p class="text-slate-600 dark:text-slate-400 italic mb-8 leading-relaxed">
                "{{ testimonial.content }}"
              </p>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-primary">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                      <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                   </svg>
                </div>
                <div>
                  <h4 class="font-bold text-slate-900 dark:text-white">{{ testimonial.name }}</h4>
                  <span class="text-sm text-primary font-medium">{{ testimonial.role }}</span>
                </div>
              </div>
            </div>
          }
        </div>
      } @else {
        <div appReveal class="flex flex-col items-center justify-center py-24 gap-6 text-center">
          <div class="w-20 h-20 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{{ lang.t().testimonials.comingSoonTitle }}</h3>
          <p class="text-slate-500 dark:text-slate-400 max-w-md">{{ lang.t().testimonials.comingSoonDescription }}</p>
        </div>
      }
    </app-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testimonials {
  protected readonly lang = inject(LanguageService);

  protected readonly testimonials = computed<Testimonial[]>(() => this.lang.t().testimonials.items);
}
