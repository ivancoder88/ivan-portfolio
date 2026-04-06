import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ScrollService } from './homepage/services/scroll.service';
import { ThemeService } from './homepage/services/theme.service';
import { LanguageService } from './homepage/services/language.service';
import { signal } from '@angular/core';
import { vi } from 'vitest';

describe('App', () => {
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
        nav: { home: 'Home', hireMe: 'Hire me' },
        hero: { greeting: 'Hi', role: 'Dev', bio: 'B', downloadCv: 'D', stats: { experience: '5', projects: '90', clients: '105', awards: '15' } },
        services: { title: 'S' }
      }),
      toggleLanguage: vi.fn()
    };

    // Mock IntersectionObserver
    (window as any).IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: ScrollService, useValue: scrollServiceMock },
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: LanguageService, useValue: languageServiceMock }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render all sections', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('app-hero')).toBeTruthy();
    expect(compiled.querySelector('app-services')).toBeTruthy();
    expect(compiled.querySelector('app-works')).toBeTruthy();
    expect(compiled.querySelector('app-resume')).toBeTruthy();
    expect(compiled.querySelector('app-skills')).toBeTruthy();
    expect(compiled.querySelector('app-testimonials')).toBeTruthy();
    expect(compiled.querySelector('app-contact')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });
});
