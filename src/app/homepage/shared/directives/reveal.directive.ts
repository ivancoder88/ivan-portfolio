import { Directive, ElementRef, inject, afterNextRender } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  host: {
    'class': 'reveal'
  }
})
export class RevealDirective {
  private readonly elementRef = inject(ElementRef);

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(this.elementRef.nativeElement);
    });
  }
}
