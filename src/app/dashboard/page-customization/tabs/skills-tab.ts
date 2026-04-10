import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ADD_BTN, CARD, DEL_BTN, FIELD_INPUT, LANG_OPTIONS, SECTION_LABEL } from '../shared';
import type { Lang } from '../shared';

type SkillItem = { name: string; percentage: number };
type Draft = Record<Lang, { skills: { items: SkillItem[] }; [key: string]: unknown }>;

@Component({
  selector: 'app-skills-tab',
  imports: [FormsModule],
  template: `
    <div class="grid lg:grid-cols-2 gap-6">
      @for (lang of langOptions; track lang.key) {
        <div class="${CARD}">
          <span class="${SECTION_LABEL}">{{ lang.label }}</span>
          <div class="space-y-3">
            @for (skill of draft()[lang.key].skills.items; track $index) {
              <div class="flex items-center gap-3">
                <input
                  class="${FIELD_INPUT} flex-1"
                  [(ngModel)]="skill.name"
                  [name]="'sk-n-'+lang.key+$index"
                  placeholder="Skill name"
                />
                <div class="flex items-center gap-2 shrink-0">
                  <input
                    class="w-20 text-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    type="number" min="0" max="100"
                    [(ngModel)]="skill.percentage"
                    [name]="'sk-p-'+lang.key+$index"
                  />
                  <span class="text-xs text-slate-400">%</span>
                </div>
                <button (click)="remove.emit({ lang: lang.key, index: $index })" class="${DEL_BTN}" aria-label="Remove skill">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            }
          </div>
          <button (click)="add.emit(lang.key)" class="${ADD_BTN} mt-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add skill
          </button>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsTab {
  readonly draft = input.required<Draft>();
  readonly add = output<Lang>();
  readonly remove = output<{ lang: Lang; index: number }>();
  protected readonly langOptions = LANG_OPTIONS;
}
