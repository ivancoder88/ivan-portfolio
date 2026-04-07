import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-mobile-menu-overlay',
  template: `
    @if (isMobileMenuOpen()) {
      <div class="fixed inset-0 bg-white dark:bg-slate-900 z-40 lg:hidden pt-24 px-6 flex flex-col items-center gap-8 mobile-menu-reveal">
        @for (link of navLinks(); track link.id) {
          <a
            class="text-2xl font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
            (click)="onLinkClick.emit(link.id)"
          >
            {{ link.label }}
          </a>
        }
        <button
          class="bg-primary text-white px-10 py-4 rounded-full text-xl font-bold mt-4"
          (click)="onLinkClick.emit('contact')"
        >
          {{ lang.t().nav.hireMe }}
        </button>
        <button (click)="lang.toggleLanguage()" class="font-bold text-lg uppercase px-4 py-2 border-2 border-primary text-primary rounded-lg">
          {{ lang.currentLanguage() === 'en' ? 'hr' : 'en' }}
        </button>
      </div>
    }
  `,
  styles: `
    .mobile-menu-reveal {
      animation: slide-down 0.3s ease-out forwards;
    }
    @keyframes slide-down {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuOverlay {
  protected readonly lang = inject(LanguageService);

  isMobileMenuOpen = input.required<boolean>();
  navLinks = input.required<{ label: string; id: string }[]>();
  onLinkClick = output<string>();
}
