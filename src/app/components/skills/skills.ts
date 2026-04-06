import { ChangeDetectionStrategy, Component, ElementRef, viewChildren, AfterViewInit } from '@angular/core';

interface Skill {
  name: string;
  percentage: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  template: `
    <section id="skills" class="w-full py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 reveal" #reveal>
          <h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">My Skills</h2>
          <div class="w-24 h-1 bg-slate-900 dark:bg-white mx-auto"></div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (skill of skills; track skill.name; let i = $index) {
            <div 
              class="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl reveal" 
              #reveal
              [style.transition-delay]="i * 100 + 'ms'"
            >
              <div class="relative w-24 h-24 mb-6">
                <svg class="w-full h-full transform -rotate-90">
                  <circle 
                    cx="48" cy="48" r="40" 
                    stroke="currentColor" 
                    stroke-width="8" 
                    fill="transparent" 
                    class="text-slate-200 dark:text-slate-700"
                  />
                  <circle 
                    cx="48" cy="48" r="40" 
                    stroke="currentColor" 
                    stroke-width="8" 
                    fill="transparent" 
                    [attr.stroke-dasharray]="2 * Math.PI * 40"
                    [attr.stroke-dashoffset]="2 * Math.PI * 40 * (1 - skill.percentage / 100)"
                    stroke-linecap="round"
                    class="text-slate-900 dark:text-white transition-all duration-1000 ease-out"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center font-bold text-xl text-slate-900 dark:text-white">
                  {{ skill.percentage }}%
                </div>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ skill.name }}</h3>
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
export class Skills implements AfterViewInit {
  protected readonly Math = Math;
  protected readonly skills: Skill[] = [
    { name: 'Angular', percentage: 95 },
    { name: 'TypeScript', percentage: 90 },
    { name: 'Tailwind CSS', percentage: 85 },
    { name: 'Node.js', percentage: 80 },
    { name: 'PostgreSQL', percentage: 75 },
    { name: 'Docker', percentage: 70 },
    { name: 'AWS', percentage: 65 },
    { name: 'Figma', percentage: 60 },
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
