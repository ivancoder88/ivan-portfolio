import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { ScrollService } from '../../services/scroll.service';
import { signal } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let scrollServiceMock: any;
  let themeServiceMock: any;
  let languageServiceMock: any;

  beforeEach(async () => {
    scrollServiceMock = {
      isThresholdExceeded: signal(false),
      scrollToSection: vi.fn()
    };
    themeServiceMock = {
      currentTheme: signal('light'),
      toggleTheme: vi.fn()
    };
    languageServiceMock = {
      currentLanguage: signal('en'),
      t: signal({
        nav: { home: 'Home', hireMe: 'Hire me', services: 'Services', works: 'Works', resume: 'Resume', skills: 'Skills', testimonials: 'Testimonials', contact: 'Contact' }
      }),
      toggleLanguage: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        { provide: ScrollService, useValue: scrollServiceMock },
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: LanguageService, useValue: languageServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Ivan Ivicek');
  });

  it('should call scrollToSection when a link is clicked', () => {
    // Links are now inside app-static-navbar or app-sticky-navbar
    // We can find them in the shadow DOM or just in the rendered nativeElement
    const links = fixture.nativeElement.querySelectorAll('a');
    links[0].click();
    expect(scrollServiceMock.scrollToSection).toHaveBeenCalled();
  });

  it('should toggle mobile menu', () => {
    // Hamburger is now app-mobile-hamburger component
    const hamburger = fixture.nativeElement.querySelector('app-mobile-hamburger button');
    hamburger.click();
    fixture.detectChanges();
    
    // Check for the presence of the mobile menu overlay component
    const overlay = fixture.nativeElement.querySelector('app-mobile-menu-overlay');
    // The overlay is always there in the DOM but its content is conditional with @if
    // Let's check if the content of the overlay is visible
    const overlayContent = fixture.nativeElement.querySelector('.mobile-menu-reveal');
    expect(overlayContent).toBeTruthy();
  });

  it('should show sticky navbar when threshold is exceeded', () => {
    scrollServiceMock.isThresholdExceeded.set(true);
    fixture.detectChanges();
    // Stickynav is app-sticky-navbar, but the internal nav has fixed class
    const stickyNav = fixture.nativeElement.querySelector('app-sticky-navbar nav.fixed');
    expect(stickyNav.classList.contains('translate-y-0')).toBe(true);
  });
});
