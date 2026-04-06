import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { ScrollService } from '../../services/scroll.service';
import { signal } from '@angular/core';
import { vi } from 'vitest';

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
        nav: { home: 'Home', hireMe: 'Hire me' }
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
    const links = fixture.nativeElement.querySelectorAll('a');
    links[0].click();
    expect(scrollServiceMock.scrollToSection).toHaveBeenCalled();
  });

  it('should toggle mobile menu', () => {
    const hamburger = fixture.nativeElement.querySelector('button.flex-col');
    hamburger.click();
    fixture.detectChanges();
    // In Navbar component, isMobileMenuOpen is protected, so we check the DOM or a getter if available.
    // Let's check for the presence of the mobile menu overlay
    const overlay = fixture.nativeElement.querySelector('.mobile-menu-reveal');
    expect(overlay).toBeTruthy();
  });

  it('should show sticky navbar when threshold is exceeded', () => {
    scrollServiceMock.isThresholdExceeded.set(true);
    fixture.detectChanges();
    const stickyNav = fixture.nativeElement.querySelector('nav.fixed');
    expect(stickyNav.classList.contains('translate-y-0')).toBe(true);
  });
});
