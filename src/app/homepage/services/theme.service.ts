import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  private platformId = inject(PLATFORM_ID);
  private theme = signal<'light' | 'dark'>('light');

  public readonly currentTheme = this.theme.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.theme.set(this.getInitialTheme());
      
      effect(() => {
        const current = this.theme();
        localStorage.setItem(this.THEME_KEY, current);
        if (current === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      });
    }
  }

  public toggleTheme(): void {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
  }

  private getInitialTheme(): 'light' | 'dark' {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
