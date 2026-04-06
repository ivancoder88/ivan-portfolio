import { ChangeDetectionStrategy, Component, inject, computed, ElementRef, viewChildren, AfterViewInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

interface Service {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  template: `
    <section id="services" class="w-full py-24 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 reveal" #reveal>
          <h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
            {{ lang.t().services.title }}
          </h2>
          <div class="w-24 h-1 bg-slate-900 dark:bg-white mx-auto"></div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of services(); track service.title; let i = $index) {
            <div 
              class="group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 reveal" 
              #reveal
              [style.transition-delay]="i * 100 + 'ms'"
            >
              <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white mb-6 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors duration-300">
                <div [innerHTML]="service.icon"></div>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">{{ service.title }}</h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                {{ service.description }}
              </p>
              <button class="mt-6 flex items-center gap-2 font-bold text-slate-900 dark:text-white group-hover:translate-x-2 transition-transform">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
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
export class Services implements AfterViewInit {
  protected readonly lang = inject(LanguageService);
  
  protected readonly services = computed<Service[]>(() => [
    {
      title: 'Web Development',
      description: 'Building modern, responsive, and high-performance web applications using the latest technologies.',
      icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>'
    },
    {
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing user interfaces that provide seamless digital experiences.',
      icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.127zm9.42 0a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.127zM15 7.333l-2 2 2 2m1-8l2 2-2 2m3 4l2 2-2 2" /></svg>'
    },
    {
      title: 'App Development',
      description: 'Developing native and cross-platform mobile applications with focus on performance and usability.',
      icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>'
    }
  ]);

  protected readonly revealElements = viewChildren<ElementRef>('reveal');

  public ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    this.revealElements().forEach(el => observer.observe(el.nativeElement));
  }
}
