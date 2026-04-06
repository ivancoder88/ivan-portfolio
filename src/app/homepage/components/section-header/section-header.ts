import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <div class="text-center mb-16" appReveal>
      <h2 class="text-4xl md:text-6xl font-black text-primary mb-4">
        {{ title() }}
      </h2>
      <div class="w-24 h-1 bg-primary mx-auto"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeader {
  readonly title = input.required<string>();
}
