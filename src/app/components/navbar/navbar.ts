import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { ScrollService } from '../../services/scroll.service';

interface NavLink {
  label: string;
  id: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  template: `
    <!-- Static Navbar -->
    <nav class="w-full bg-white dark:bg-slate-900 transition-colors duration-300 py-6 px-6 md:px-12 flex justify-between items-center z-40 relative">
      <div class="text-2xl font-bold text-slate-900 dark:text-white cursor-pointer" (click)="scrollService.scrollToSection('home')">
        {{ name }}
      </div>

      <!-- Desktop Links -->
      <div class="hidden lg:flex items-center gap-8">
        @for (link of navLinks(); track link.id) {
          <a
            class="relative text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group py-1"
            (click)="scrollService.scrollToSection(link.id)"
          >
            {{ link.label }}
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </a>
        }
        <button
          class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all transform hover:scale-105 active:scale-95"
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

      <!-- Mobile Hamburger -->
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
        <button (click)="toggleMobileMenu()" class="flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative z-50 overflow-hidden">
          <span class="w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 transform" [class.rotate-45]="isMobileMenuOpen()" [class.translate-y-2]="isMobileMenuOpen()"></span>
          <span class="w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300" [class.opacity-0]="isMobileMenuOpen()" [class.-translate-x-full]="isMobileMenuOpen()"></span>
          <span class="w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 transform" [class.-rotate-45]="isMobileMenuOpen()" [class.-translate-y-2]="isMobileMenuOpen()"></span>
        </button>
      </div>
    </nav>

    <!-- Sticky Navbar -->
    <nav 
      class="fixed top-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg transition-transform duration-500 py-4 px-6 md:px-12 flex justify-between items-center z-50"
      [class.-translate-y-full]="!scrollService.isThresholdExceeded()"
      [class.translate-y-0]="scrollService.isThresholdExceeded()"
    >
      <div class="text-xl font-bold text-slate-900 dark:text-white cursor-pointer" (click)="scrollService.scrollToSection('home')">
        {{ name }}
      </div>
      <div class="hidden lg:flex items-center gap-6">
        @for (link of navLinks(); track link.id) {
          <a
            class="relative text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group py-1"
            (click)="scrollService.scrollToSection(link.id)"
          >
            {{ link.label }}
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </a>
        }
        <button
          class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all transform hover:scale-105 active:scale-95"
          (click)="scrollService.scrollToSection('contact')"
        >
          {{ lang.t().nav.hireMe }}
        </button>
      </div>
      <div class="lg:hidden">
        <button (click)="toggleMobileMenu()" class="flex flex-col justify-center items-center w-8 h-8 gap-1.5">
          <span class="w-5 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300" [class.rotate-45]="isMobileMenuOpen()" [class.translate-y-2]="isMobileMenuOpen()"></span>
          <span class="w-5 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300" [class.opacity-0]="isMobileMenuOpen()"></span>
          <span class="w-5 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300" [class.-rotate-45]="isMobileMenuOpen()" [class.-translate-y-2]="isMobileMenuOpen()"></span>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    @if (isMobileMenuOpen()) {
      <div class="fixed inset-0 bg-white dark:bg-slate-900 z-40 lg:hidden pt-24 px-6 flex flex-col items-center gap-8 mobile-menu-reveal">
        @for (link of navLinks(); track link.id) {
          <a
            class="text-2xl font-bold text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
            (click)="onMobileLinkClick(link.id)"
          >
            {{ link.label }}
          </a>
        }
        <button
          class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 rounded-full text-xl font-bold mt-4"
          (click)="onMobileLinkClick('contact')"
        >
          {{ lang.t().nav.hireMe }}
        </button>
        <button (click)="lang.toggleLanguage()" class="font-bold text-lg uppercase px-4 py-2 border-2 border-slate-900 dark:border-white rounded-lg">
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
export class Navbar {
  protected readonly lang = inject(LanguageService);
  protected readonly themeService = inject(ThemeService);
  protected readonly scrollService = inject(ScrollService);

  protected readonly name = 'Ivan Ivicek';
  protected readonly isMobileMenuOpen = signal(false);

  protected readonly navLinks = computed<NavLink[]>(() => [
    { label: this.lang.t().nav.home, id: 'home' },
    { label: this.lang.t().nav.services, id: 'services' },
    { label: this.lang.t().nav.works, id: 'works' },
    { label: this.lang.t().nav.resume, id: 'resume' },
    { label: this.lang.t().nav.skills, id: 'skills' },
    { label: this.lang.t().nav.testimonials, id: 'testimonials' },
    { label: this.lang.t().nav.contact, id: 'contact' },
  ]);

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  protected onMobileLinkClick(id: string): void {
    this.isMobileMenuOpen.set(false);
    this.scrollService.scrollToSection(id);
  }
}
