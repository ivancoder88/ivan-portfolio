import { ChangeDetectionStrategy, Component, inject, computed, ElementRef, viewChildren, afterNextRender } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { AppIcon, IconName } from '../icon/icon';

interface Service {
  title: string;
  description: string;
  icon: IconName;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [AppIcon],
  template: `
    <section id="services" class="w-full py-24 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 reveal" #reveal>
          <h2 class="text-4xl md:text-6xl font-black text-primary mb-4">
            {{ lang.t().services.title }}
          </h2>
          <div class="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of services(); track service.title; let i = $index) {
            <div 
              class="group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 reveal" 
              #reveal
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
                Read More
                <app-icon name="arrow-right" class="w-4 h-4" />
              </button>
            </div>
          }
        </div>
      </div>
    </section>

    <style>
      .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
      }
      .reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }
    </style>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  protected readonly lang = inject(LanguageService);
  
  protected readonly services = computed<Service[]>(() => [
    {
      title: 'Web Development',
      description: 'Building modern, responsive, and high-performance web applications using the latest technologies.',
      icon: 'web'
    },
    {
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing user interfaces that provide seamless digital experiences.',
      icon: 'uiux'
    },
    {
      title: 'App Development',
      description: 'Developing native and cross-platform mobile applications with focus on performance and usability.',
      icon: 'app'
    }
  ]);

  protected readonly revealElements = viewChildren<ElementRef>('reveal');

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      this.revealElements().forEach(el => observer.observe(el.nativeElement));
    });
  }
}
