import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-mobile-hamburger',
  template: `
    <button (click)="toggle.emit()" class="flex flex-col justify-center items-center w-10 h-10 relative z-50">
      @if (!isMobileMenuOpen()) {
        <div class="flex flex-col gap-1.5">
          <span class="w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300"></span>
          <span class="w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300"></span>
          <span class="w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300"></span>
        </div>
      } @else {
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-slate-900 dark:text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      }
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileHamburger {
  isMobileMenuOpen = input.required<boolean>();
  toggle = output<void>();
}
