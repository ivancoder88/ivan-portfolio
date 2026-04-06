import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PlatformService } from '../../core/services/platform.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  private platform = inject(PlatformService);
  private document = inject(DOCUMENT);
  private theme = signal<'light' | 'dark'>('light');

  public readonly currentTheme = this.theme.asReadonly();

  constructor() {
    if (this.platform.isBrowser) {
      this.theme.set(this.getInitialTheme());
      
      effect(() => {
        const current = this.theme();
        localStorage.setItem(this.THEME_KEY, current);
        this.document.documentElement.classList.toggle('dark', current === 'dark');
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
