import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="w-full py-12 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="text-2xl font-bold text-slate-900 dark:text-white cursor-pointer" (click)="scrollService.scrollToSection('home')">
          Ivan Ivicek
        </div>
        
        <p class="text-slate-500 dark:text-slate-400 font-medium">
          © {{ currentYear }} Ivan Ivicek. All rights reserved.
        </p>

        <div class="flex gap-6">
          <a href="#" class="text-slate-400 hover:text-primary transition-colors">Twitter</a>
          <a href="#" class="text-slate-400 hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" class="text-slate-400 hover:text-primary transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly scrollService = inject(ScrollService);
  protected readonly currentYear = new Date().getFullYear();
}
