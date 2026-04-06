import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private platformId = inject(PLATFORM_ID);
  private _isThresholdExceeded = signal(false);

  public readonly isThresholdExceeded = this._isThresholdExceeded.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        // Threshold: Navbar height (assume 80px) + 2rem (32px) = 112px
        this._isThresholdExceeded.set(window.scrollY > 112);
      });
    }
  }

  public scrollToSection(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
