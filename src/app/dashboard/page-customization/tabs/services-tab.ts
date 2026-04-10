import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ADD_BTN, CARD, DEL_BTN, DIVIDER, FIELD_INPUT, LANG_OPTIONS, SECTION_LABEL } from '../shared';
import type { Lang } from '../shared';

type ServiceItem = { title: string; description: string; icon: string };
type Draft = Record<Lang, { services: { items: ServiceItem[] }; [key: string]: unknown }>;

@Component({
  selector: 'app-services-tab',
  imports: [FormsModule],
  template: `
    <div class="grid lg:grid-cols-2 gap-6">
      @for (lang of langOptions; track lang.key) {
        <div class="${CARD}">
          <span class="${SECTION_LABEL}">{{ lang.label }}</span>
          @for (svc of draft()[lang.key].services.items; track $index) {
            <div class="${DIVIDER}">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase">Service {{ $index + 1 }}</span>
                <button (click)="remove.emit({ lang: lang.key, index: $index })" class="${DEL_BTN}" aria-label="Remove service">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
              <input class="${FIELD_INPUT}" [(ngModel)]="svc.title" [name]="'svc-t-'+lang.key+$index" placeholder="Title" />
              <textarea class="${FIELD_INPUT}" rows="3" [(ngModel)]="svc.description" [name]="'svc-d-'+lang.key+$index" placeholder="Description"></textarea>
            </div>
          }
          <button (click)="add.emit(lang.key)" class="${ADD_BTN}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add service
          </button>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesTab {
  readonly draft = input.required<Draft>();
  readonly add = output<Lang>();
  readonly remove = output<{ lang: Lang; index: number }>();
  protected readonly langOptions = LANG_OPTIONS;
}
