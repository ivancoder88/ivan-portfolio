import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CARD, FIELD_INPUT, FIELD_LABEL, LANG_OPTIONS, SECTION_LABEL } from '../shared';
import type { Lang } from '../shared';

type ContactData = {
  title: string;
  heading: string;
  description: string;
  email: string;
  phone: string;
  [key: string]: unknown;
};
type Draft = Record<Lang, { contact: ContactData; [key: string]: unknown }>;

@Component({
  selector: 'app-contact-tab',
  imports: [FormsModule],
  template: `
    <div class="grid lg:grid-cols-2 gap-6">
      @for (lang of langOptions; track lang.key) {
        <div class="${CARD}">
          <span class="${SECTION_LABEL}">{{ lang.label }}</span>
          <label class="block">
            <span class="${FIELD_LABEL}">Section title</span>
            <input class="${FIELD_INPUT}" [(ngModel)]="draft()[lang.key].contact.title" [name]="'ct-title-'+lang.key" />
          </label>
          <label class="block">
            <span class="${FIELD_LABEL}">Heading</span>
            <input class="${FIELD_INPUT}" [(ngModel)]="draft()[lang.key].contact.heading" [name]="'ct-h-'+lang.key" />
          </label>
          <label class="block">
            <span class="${FIELD_LABEL}">Description</span>
            <textarea class="${FIELD_INPUT}" rows="3" [(ngModel)]="draft()[lang.key].contact.description" [name]="'ct-d-'+lang.key"></textarea>
          </label>
          <label class="block">
            <span class="${FIELD_LABEL}">Email address</span>
            <input class="${FIELD_INPUT}" type="email" [(ngModel)]="draft()[lang.key].contact.email" [name]="'ct-e-'+lang.key" />
          </label>
          <label class="block">
            <span class="${FIELD_LABEL}">Phone number</span>
            <input class="${FIELD_INPUT}" [(ngModel)]="draft()[lang.key].contact.phone" [name]="'ct-p-'+lang.key" />
          </label>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactTab {
  readonly draft = input.required<Draft>();
  protected readonly langOptions = LANG_OPTIONS;
}
