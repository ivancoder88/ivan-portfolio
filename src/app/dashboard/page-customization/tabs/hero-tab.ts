import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CARD, FIELD_INPUT, FIELD_LABEL, LANG_OPTIONS, SECTION_LABEL } from '../shared';
import type { Lang } from '../shared';

type Draft = Record<Lang, {
  name: string;
  hero: { greeting: string; role: string; bio: string; downloadCv: string; stats: Record<string, string> };
  [key: string]: unknown;
}>;

@Component({
  selector: 'app-hero-tab',
  imports: [FormsModule],
  template: `
    <div class="grid lg:grid-cols-2 gap-6">
      @for (lang of langOptions; track lang.key) {
        <div class="${CARD}">
          <span class="${SECTION_LABEL}">{{ lang.label }}</span>
          <label class="block">
            <span class="${FIELD_LABEL}">Full Name</span>
            <input class="${FIELD_INPUT}" [(ngModel)]="draft()[lang.key].name" [name]="'name-'+lang.key" />
          </label>
          <label class="block">
            <span class="${FIELD_LABEL}">Greeting line</span>
            <input class="${FIELD_INPUT}" [(ngModel)]="draft()[lang.key].hero.greeting" [name]="'greeting-'+lang.key" />
          </label>
          <label class="block">
            <span class="${FIELD_LABEL}">Role / Title</span>
            <input class="${FIELD_INPUT}" [(ngModel)]="draft()[lang.key].hero.role" [name]="'role-'+lang.key" />
          </label>
          <label class="block">
            <span class="${FIELD_LABEL}">Bio</span>
            <textarea class="${FIELD_INPUT}" rows="4" [(ngModel)]="draft()[lang.key].hero.bio" [name]="'bio-'+lang.key"></textarea>
          </label>
          <label class="block">
            <span class="${FIELD_LABEL}">Download CV button label</span>
            <input class="${FIELD_INPUT}" [(ngModel)]="draft()[lang.key].hero.downloadCv" [name]="'cv-'+lang.key" />
          </label>
          <p class="${FIELD_LABEL} pt-2">Stats</p>
          <div class="grid grid-cols-2 gap-3">
            <label class="block">
              <span class="${FIELD_LABEL}">Experience</span>
              <input class="${FIELD_INPUT}" [(ngModel)]="draft()[lang.key].hero.stats['experience']" [name]="'exp-'+lang.key" />
            </label>
            <label class="block">
              <span class="${FIELD_LABEL}">Projects</span>
              <input class="${FIELD_INPUT}" [(ngModel)]="draft()[lang.key].hero.stats['projects']" [name]="'proj-'+lang.key" />
            </label>
            <label class="block">
              <span class="${FIELD_LABEL}">Clients</span>
              <input class="${FIELD_INPUT}" [(ngModel)]="draft()[lang.key].hero.stats['clients']" [name]="'clients-'+lang.key" />
            </label>
            <label class="block">
              <span class="${FIELD_LABEL}">Awards</span>
              <input class="${FIELD_INPUT}" [(ngModel)]="draft()[lang.key].hero.stats['awards']" [name]="'awards-'+lang.key" />
            </label>
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroTab {
  readonly draft = input.required<Draft>();
  protected readonly langOptions = LANG_OPTIONS;
}
