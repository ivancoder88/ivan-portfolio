import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../../shared/components/section/section';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface Skill {
  name: string;
  percentage: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionHeader, Section, RevealDirective],
  template: `
    <app-section id="skills">
      <app-section-header title="My Skills" />

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        @for (skill of skills; track skill.name; let i = $index) {
          <div 
            appReveal
            class="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl" 
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
                  class="text-primary transition-all duration-1000 ease-out"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center font-bold text-xl text-primary">
                {{ skill.percentage }}%
              </div>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ skill.name }}</h3>
          </div>
        }
      </div>
    </app-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
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
}
