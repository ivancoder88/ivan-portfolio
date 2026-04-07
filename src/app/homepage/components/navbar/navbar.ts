import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';
import { StaticNavbar } from './static-navbar';
import { StickyNavbar } from './sticky-navbar';
import { MobileHamburger } from './mobile-hamburger';
import { MobileMenuOverlay } from './mobile-menu-overlay';

interface NavLink {
  label: string;
  id: string;
}

@Component({
  selector: 'app-navbar',
  imports: [StaticNavbar, StickyNavbar, MobileHamburger, MobileMenuOverlay],
  template: `
    <app-static-navbar
      [name]="name"
      [navLinks]="navLinks()"
      [isMobileMenuOpen]="isMobileMenuOpen()"
    >
      <app-mobile-hamburger
        [isMobileMenuOpen]="isMobileMenuOpen()"
        (toggle)="toggleMobileMenu()"
      />
    </app-static-navbar>

    <app-sticky-navbar
      [name]="name"
      [navLinks]="navLinks()"
      [isMobileMenuOpen]="isMobileMenuOpen()"
    >
      <app-mobile-hamburger
        [isMobileMenuOpen]="isMobileMenuOpen()"
        (toggle)="toggleMobileMenu()"
      />
    </app-sticky-navbar>

    <app-mobile-menu-overlay
      [isMobileMenuOpen]="isMobileMenuOpen()"
      [navLinks]="navLinks()"
      (onLinkClick)="onMobileLinkClick($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  protected readonly lang = inject(LanguageService);
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
