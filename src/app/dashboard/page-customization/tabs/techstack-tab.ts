import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ADD_BTN, CARD, DEL_BTN, DIVIDER, FIELD_INPUT, FIELD_LABEL, LANG_OPTIONS, SECTION_LABEL } from '../shared';
import type { Lang } from '../shared';

type TechCategory = { name: string; items: string[] };
type Draft = Record<Lang, { techStack: { categories: TechCategory[] }; [key: string]: unknown }>;

@Component({
  selector: 'app-techstack-tab',
  imports: [FormsModule],
  template: `
    <div class="grid lg:grid-cols-2 gap-6">
      @for (lang of langOptions; track lang.key) {
        <div class="${CARD}">
          <span class="${SECTION_LABEL}">{{ lang.label }}</span>
          @for (cat of draft()[lang.key].techStack.categories; track $index) {
            <div class="${DIVIDER}">
              <div class="flex items-center gap-2">
                <input
                  class="${FIELD_INPUT} flex-1 font-semibold"
                  [(ngModel)]="cat.name"
                  [name]="'tc-n-'+lang.key+$index"
                  placeholder="Category name"
                />
                <button (click)="remove.emit({ lang: lang.key, index: $index })" class="${DEL_BTN}" aria-label="Remove category">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <label class="block">
                <span class="${FIELD_LABEL}">Items (comma separated)</span>
                <input class="${FIELD_INPUT}"
                  [ngModel]="cat.items.join(', ')"
                  (ngModelChange)="cat.items = splitItems($event)"
                  [name]="'tc-i-'+lang.key+$index"
                />
              </label>
            </div>
          }
          <button (click)="add.emit(lang.key)" class="${ADD_BTN}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add category
          </button>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechstackTab {
  readonly draft = input.required<Draft>();
  readonly add = output<Lang>();
  readonly remove = output<{ lang: Lang; index: number }>();
  protected readonly langOptions = LANG_OPTIONS;

  protected splitItems(value: string): string[] {
    return value.split(',').map(t => t.trim()).filter(Boolean);
  }
}
