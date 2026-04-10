import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ADD_BTN, CARD, DEL_BTN, DIVIDER, FIELD_INPUT, FIELD_LABEL, LANG_OPTIONS, SECTION_LABEL } from '../shared';
import type { Lang } from '../shared';
import type { TimelineItem } from '../../../homepage/services/language.service';

type Draft = Record<Lang, { timeline: { items: TimelineItem[] }; [key: string]: unknown }>;

@Component({
  selector: 'app-timeline-tab',
  imports: [FormsModule],
  template: `
    <div class="grid lg:grid-cols-2 gap-6">
      @for (lang of langOptions; track lang.key) {
        <div class="${CARD}">
          <span class="${SECTION_LABEL}">{{ lang.label }}</span>
          @for (item of draft()[lang.key].timeline.items; track $index) {
            <div class="${DIVIDER}">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase">Entry {{ $index + 1 }}</span>
                <button (click)="remove.emit({ lang: lang.key, index: $index })" class="${DEL_BTN}" aria-label="Remove entry">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <label class="block">
                  <span class="${FIELD_LABEL}">Start year</span>
                  <input class="${FIELD_INPUT}" [(ngModel)]="item.year" [name]="'tl-y-'+lang.key+$index" />
                </label>
                <label class="block">
                  <span class="${FIELD_LABEL}">End year</span>
                  <input class="${FIELD_INPUT}" [(ngModel)]="item.endYear" [name]="'tl-e-'+lang.key+$index" />
                </label>
              </div>
              <label class="block">
                <span class="${FIELD_LABEL}">Job title</span>
                <input class="${FIELD_INPUT}" [(ngModel)]="item.title" [name]="'tl-t-'+lang.key+$index" />
              </label>
              <label class="block">
                <span class="${FIELD_LABEL}">Company</span>
                <input class="${FIELD_INPUT}" [(ngModel)]="item.company" [name]="'tl-c-'+lang.key+$index" />
              </label>
              <label class="block">
                <span class="${FIELD_LABEL}">Location</span>
                <input class="${FIELD_INPUT}" [(ngModel)]="item.location" [name]="'tl-l-'+lang.key+$index" />
              </label>
              <label class="block">
                <span class="${FIELD_LABEL}">Type</span>
                <select class="${FIELD_INPUT}" [(ngModel)]="item.type" [name]="'tl-tp-'+lang.key+$index">
                  <option value="software">Software</option>
                  <option value="engineering">Engineering</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label class="block">
                <span class="${FIELD_LABEL}">Description</span>
                <textarea class="${FIELD_INPUT}" rows="3" [(ngModel)]="item.description" [name]="'tl-d-'+lang.key+$index"></textarea>
              </label>
              <label class="block">
                <span class="${FIELD_LABEL}">Tags (comma separated)</span>
                <input class="${FIELD_INPUT}"
                  [ngModel]="item.tags.join(', ')"
                  (ngModelChange)="item.tags = splitTags($event)"
                  [name]="'tl-tg-'+lang.key+$index"
                />
              </label>
            </div>
          }
          <button (click)="add.emit(lang.key)" class="${ADD_BTN}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add entry
          </button>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineTab {
  readonly draft = input.required<Draft>();
  readonly add = output<Lang>();
  readonly remove = output<{ lang: Lang; index: number }>();
  protected readonly langOptions = LANG_OPTIONS;

  protected splitTags(value: string): string[] {
    return value.split(',').map(t => t.trim()).filter(Boolean);
  }
}
