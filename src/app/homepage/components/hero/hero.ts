import { ChangeDetectionStrategy, Component, inject, computed, ElementRef, viewChildren, AfterViewInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

interface SocialLink {
  icon: string;
  url: string;
  name: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  template: `
    <section id="home" class="w-full min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 pt-12 pb-24 px-6 md:px-12 lg:px-24">
      <div class="grid lg:grid-cols-2 gap-12 items-center mb-24">
        <div class="flex flex-col gap-6 order-2 lg:order-1 reveal" #reveal>
          <span class="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-400">
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
                class="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all duration-300"
                [attr.aria-label]="social.name"
              >
                <div [innerHTML]="social.icon"></div>
              </a>
            }
          </div>
          <div class="mt-8">
            <button class="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 group">
              {{ lang.t().hero.downloadCv }}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 group-hover:animate-bounce">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12L12 16.5m0 0L16.5 12M12 16.5V3" />
              </svg>
            </button>
          </div>
        </div>
        <div class="relative order-1 lg:order-2 flex justify-center lg:justify-end reveal" #reveal>
          <div class="relative w-72 h-72 md:w-96 md:h-96">
            <div class="absolute inset-0 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 animate-spin-slow"></div>
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
            <span class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
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
export class Hero implements AfterViewInit {
  protected readonly lang = inject(LanguageService);
  
  protected readonly socialLinks = computed<SocialLink[]>(() => [
    { name: 'X', url: '#', icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
    { name: 'Instagram', url: '#', icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>' },
    { name: 'LinkedIn', url: '#', icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>' },
    { name: 'Facebook', url: '#', icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' },
  ]);

  protected readonly stats = computed<string[]>(() => [
    this.lang.t().hero.stats.experience,
    this.lang.t().hero.stats.projects,
    this.lang.t().hero.stats.clients,
    this.lang.t().hero.stats.awards,
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
