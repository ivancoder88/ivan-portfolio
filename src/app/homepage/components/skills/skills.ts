import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { Section } from '../../shared/components/section/section';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LanguageService } from '../../services/language.service';
import { SkillCircle } from './skill-circle';

interface Skill {
  name: string;
  percentage: number;
}

@Component({
  selector: 'app-skills',
  imports: [SectionHeader, Section, RevealDirective, SkillCircle],
  template: `
    <app-section id="skills">
      <app-section-header [title]="lang.t().skills.title" />
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        @for (skill of skills(); track skill.name; let i = $index) {
          <div appReveal [style.transition-delay]="i * 100 + 'ms'">
            <app-skill-circle [name]="skill.name" [percentage]="skill.percentage" />
          </div>
        }
      </div>
    </app-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly lang = inject(LanguageService);
  protected readonly skills = computed<Skill[]>(() => this.lang.t().skills.items);
}
