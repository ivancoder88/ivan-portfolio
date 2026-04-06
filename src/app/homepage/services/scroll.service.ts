import { Injectable, signal, inject } from '@angular/core';
import { PlatformService } from '../../core/services/platform.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private platform = inject(PlatformService);
  private _isThresholdExceeded = signal(false);

  public readonly isThresholdExceeded = this._isThresholdExceeded.asReadonly();

  constructor() {
    if (this.platform.isBrowser) {
      window.addEventListener('scroll', () => {
        // Threshold: Navbar height (assume 80px) + 2rem (32px) = 112px
        this._isThresholdExceeded.set(window.scrollY > 112);
      });
    }
  }

  public scrollToSection(id: string): void {
    if (this.platform.isBrowser) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
