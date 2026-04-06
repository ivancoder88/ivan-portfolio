import { ChangeDetectionStrategy, Component, ElementRef, viewChildren, AfterViewInit } from '@angular/core';

interface Project {
  title: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [],
  template: `
    <section id="works" class="w-full py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 reveal" #reveal>
          <h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">My Works</h2>
          <div class="w-24 h-1 bg-slate-900 dark:bg-white mx-auto"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          @for (project of projects; track project.title; let i = $index) {
            <div 
              class="group relative overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800 reveal" 
              #reveal
              [style.transition-delay]="i * 150 + 'ms'"
            >
              <div class="aspect-video w-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-20 h-20">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span class="text-white/70 text-sm font-medium mb-1">{{ project.category }}</span>
                <h3 class="text-white text-2xl font-bold">{{ project.title }}</h3>
              </div>
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
export class Works implements AfterViewInit {
  protected readonly projects: Project[] = [
    { title: 'Digital Agency Website', category: 'Web Development', image: '' },
    { title: 'E-commerce Mobile App', category: 'App Design', image: '' },
    { title: 'Personal Brand Identity', category: 'Branding', image: '' },
    { title: 'SaaS Dashboard', category: 'UI/UX Design', image: '' },
  ];

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
