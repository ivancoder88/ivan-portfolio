import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section',
  template: `
    <section [id]="id()" [class]="sectionClasses()">
      <div class="max-w-7xl mx-auto">
        <ng-content />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Section {
  readonly id = input.required<string>();
  readonly variant = input<'white' | 'slate'>('white');
  readonly customClasses = input<string>('');

  protected readonly sectionClasses = () => {
    const base = 'w-full py-24 px-6 md:px-12 lg:px-24 transition-colors duration-300';
    const bg = this.variant() === 'white' 
      ? 'bg-white dark:bg-slate-900' 
      : 'bg-slate-50 dark:bg-slate-800/50';
    return `${base} ${bg} ${this.customClasses()}`;
  };
}
