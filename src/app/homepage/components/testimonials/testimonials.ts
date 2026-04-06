import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [SectionHeader, Section, RevealDirective],
  template: `
    <app-section id="testimonials" variant="slate">
      <app-section-header title="What Clients Say" />

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (testimonial of testimonials; track testimonial.name; let i = $index) {
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
    </app-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testimonials {
  protected readonly testimonials: Testimonial[] = [
    { name: 'John Doe', role: 'CEO at Tech Corp', content: 'Ivan is an exceptional developer who transformed our vision into a stunning digital reality. His attention to detail and technical expertise are unmatched.', rating: 5 },
    { name: 'Jane Smith', role: 'Marketing Manager', content: 'Working with Ivan was a breeze. He delivered our project on time and exceeded our expectations in every way. Highly recommended!', rating: 5 },
    { name: 'Michael Brown', role: 'Entrepreneur', content: 'The best software developer I have ever worked with. Smart, creative, and very professional. The results speak for themselves.', rating: 5 },
  ];
}
