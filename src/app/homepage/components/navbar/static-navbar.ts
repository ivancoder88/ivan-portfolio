import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-static-navbar',
  template: `
    <nav 
      class="w-full bg-white dark:bg-slate-900 transition-colors duration-300 py-6 px-6 md:px-12 flex justify-between items-center z-50"
      [class.relative]="!isMobileMenuOpen()"
      [class.fixed]="isMobileMenuOpen()"
      [class.top-0]="isMobileMenuOpen()"
      [class.left-0]="isMobileMenuOpen()"
      [class.shadow-lg]="isMobileMenuOpen()"
    >
      <div class="text-2xl font-bold text-slate-900 dark:text-white cursor-pointer" (click)="scrollService.scrollToSection('home')">
        {{ name() }}
      </div>

      <!-- Desktop Links -->
      <div class="hidden lg:flex items-center gap-8">
        @for (link of navLinks(); track link.id) {
          <a
            class="relative text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer group py-1"
            (click)="scrollService.scrollToSection(link.id)"
          >
            {{ link.label }}
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </a>
        }
        <button
          class="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95"
          (click)="scrollService.scrollToSection('contact')"
        >
          {{ lang.t().nav.hireMe }}
        </button>
        
        <!-- Theme Toggle -->
        <button (click)="themeService.toggleTheme()" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          @if (themeService.currentTheme() === 'light') {
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25m-13.5 0h-2.25m15.356-6.356l-1.591 1.591M6.786 17.214l-1.591 1.591m12.728 0l-1.591-1.591M6.786 6.786L5.195 5.195M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          }
        </button>

        <!-- Lang Toggle -->
        <button (click)="lang.toggleLanguage()" class="font-bold text-sm uppercase px-2 hover:text-slate-900 dark:hover:text-white transition-colors">
          {{ lang.currentLanguage() === 'en' ? 'hr' : 'en' }}
        </button>
      </div>

      <!-- Mobile Controls (Hamburger) -->
      <div class="lg:hidden flex items-center gap-4">
        <button (click)="themeService.toggleTheme()" class="p-2">
          @if (themeService.currentTheme() === 'light') {
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25m-13.5 0h-2.25m15.356-6.356l-1.591 1.591M6.786 17.214l-1.591 1.591m12.728 0l-1.591-1.591M6.786 6.786L5.195 5.195M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          }
        </button>
        <ng-content select="app-mobile-hamburger"></ng-content>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticNavbar {
  protected readonly lang = inject(LanguageService);
  protected readonly themeService = inject(ThemeService);
  protected readonly scrollService = inject(ScrollService);

  name = input.required<string>();
  navLinks = input.required<{ label: string; id: string }[]>();
  isMobileMenuOpen = input.required<boolean>();
}
