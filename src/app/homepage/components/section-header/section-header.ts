import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <div class="text-center mb-16 reveal" #header>
      <h2 class="text-3xl md:text-4xl font-black text-primary mb-4">
        {{ title() }}
      </h2>
      <div class="w-24 h-1 bg-primary mx-auto"></div>
    </div>
  `,
  styles: `
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeader {
  readonly title = input.required<string>();
  private readonly headerElement = viewChild<ElementRef>('header');

  constructor() {
    afterNextRender(() => {
      const header = this.headerElement();
      if (!header) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      observer.observe(header.nativeElement);
    });
  }
}
