import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-sticky-navbar',
  template: `
    <nav 
      class="fixed top-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg transition-transform duration-500 py-4 px-6 md:px-12 flex justify-between items-center z-50"
      [class.-translate-y-full]="!scrollService.isThresholdExceeded() || isMobileMenuOpen()"
      [class.translate-y-0]="scrollService.isThresholdExceeded() && !isMobileMenuOpen()"
    >
      <div class="text-xl font-bold text-slate-900 dark:text-white cursor-pointer" (click)="scrollService.scrollToSection('home')">
        {{ name() }}
      </div>
      <div class="hidden lg:flex items-center gap-6">
        @for (link of navLinks(); track link.id) {
          <a
            class="relative text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer group py-1"
            (click)="scrollService.scrollToSection(link.id)"
          >
            {{ link.label }}
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </a>
        }
        <button
          class="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95"
          (click)="scrollService.scrollToSection('contact')"
        >
          {{ lang.t().nav.hireMe }}
        </button>
      </div>
      <div class="lg:hidden">
        <ng-content select="app-mobile-hamburger"></ng-content>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyNavbar {
  protected readonly lang = inject(LanguageService);
  protected readonly scrollService = inject(ScrollService);

  name = input.required<string>();
  navLinks = input.required<{ label: string; id: string }[]>();
  isMobileMenuOpen = input.required<boolean>();
}
