import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { LanguageService } from '../../services/language.service';

// Evaluated at build/server startup time — safe in both SSR and browser
const CURRENT_YEAR = new Date().getFullYear();

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="w-full py-12 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <button
          class="text-2xl font-bold text-slate-900 dark:text-white"
          (click)="scrollService.scrollToSection('home')"
        >
          {{ lang.t().name }}
        </button>

        <p class="text-slate-500 dark:text-slate-400 font-medium">
          © {{ currentYear }} {{ lang.t().name }}. {{ lang.t().footer.rights }}
        </p>

        <div class="flex gap-6">
          <a href="#" class="text-slate-400 hover:text-primary transition-colors">{{ lang.t().footer.social.twitter }}</a>
          <a href="#" class="text-slate-400 hover:text-primary transition-colors">{{ lang.t().footer.social.linkedin }}</a>
          <a href="#" class="text-slate-400 hover:text-primary transition-colors">{{ lang.t().footer.social.github }}</a>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly scrollService = inject(ScrollService);
  protected readonly lang = inject(LanguageService);
  protected readonly currentYear = CURRENT_YEAR;
}
