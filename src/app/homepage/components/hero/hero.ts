import { ChangeDetectionStrategy, Component, inject, computed, ElementRef, viewChildren, afterNextRender } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { AppIcon, IconName } from '../icon/icon';

interface SocialLink {
  icon: IconName;
  url: string;
  name: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [AppIcon],
  template: `
    <section id="home" class="w-full min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 pt-12 pb-24 px-6 md:px-12 lg:px-24">
      <div class="grid lg:grid-cols-2 gap-12 items-center mb-24">
        <div class="flex flex-col gap-6 order-2 lg:order-1 reveal" #reveal>
          <span class="text-xl md:text-2xl font-medium text-primary">
            {{ lang.t().hero.greeting }}
          </span>
          <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {{ lang.t().hero.role }}
          </h1>
          <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            {{ lang.t().hero.bio }}
          </p>
          <div class="flex gap-4 mt-4">
            @for (social of socialLinks(); track social.name) {
              <a 
                [href]="social.url" 
                target="_blank" 
                class="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300"
                [attr.aria-label]="social.name"
              >
                <app-icon [name]="social.icon" class="w-5 h-5" />
              </a>
            }
          </div>
          <div class="mt-8">
            <button class="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 group">
              {{ lang.t().hero.downloadCv }}
              <app-icon name="download" class="w-5 h-5 group-hover:animate-bounce" />
            </button>
          </div>
        </div>
        <div class="relative order-1 lg:order-2 flex justify-center lg:justify-end reveal" #reveal>
          <div class="relative w-72 h-72 md:w-96 md:h-96">
            <div class="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"></div>
            <div class="absolute inset-4 overflow-hidden rounded-2xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 bg-slate-200 dark:bg-slate-800">
               <div class="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-24 h-24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
               </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-8 border-y border-slate-200 dark:border-slate-800 reveal" #reveal>
        @for (stat of stats(); track stat) {
          <div class="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
            <span class="text-3xl md:text-5xl font-black text-primary">
              {{ stat.split(' ')[0] }}
            </span>
            <span class="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-tight">
              {{ stat.substring(stat.indexOf(' ') + 1) }}
            </span>
          </div>
        }
      </div>
    </section>
    <style>
      .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
      .reveal.visible { opacity: 1; transform: translateY(0); }
      .animate-spin-slow { animation: spin 12s linear infinite; }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    </style>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly lang = inject(LanguageService);
  
  protected readonly socialLinks = computed<SocialLink[]>(() => [
    { name: 'X', url: '#', icon: 'x' },
    { name: 'Instagram', url: '#', icon: 'instagram' },
    { name: 'LinkedIn', url: '#', icon: 'linkedin' },
    { name: 'Facebook', url: '#', icon: 'facebook' },
  ]);

  protected readonly stats = computed<string[]>(() => [
    this.lang.t().hero.stats.experience,
    this.lang.t().hero.stats.projects,
    this.lang.t().hero.stats.clients,
    this.lang.t().hero.stats.awards,
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
