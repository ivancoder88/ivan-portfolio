import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppIcon, IconName } from '../icon/icon';

@Component({
  selector: 'app-contact-info-item',
  imports: [AppIcon],
  template: `
    <div class="flex items-center gap-6 group">
      <div class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <app-icon [name]="icon()" class="w-6 h-6" />
      </div>
      <div>
        <span class="block text-sm text-primary font-bold uppercase tracking-wider">{{ label() }}</span>
        <a [href]="href()" class="text-xl font-bold text-slate-900 dark:text-white hover:underline">{{ value() }}</a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoItem {
  readonly icon = input.required<IconName>();
  readonly label = input.required<string>();
  readonly href = input.required<string>();
  readonly value = input.required<string>();
}
