import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';
import { LanguageService } from '../../services/language.service';
import { signal } from '@angular/core';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;
  let languageServiceMock: any;

  beforeEach(async () => {
    languageServiceMock = {
      t: signal({
        hero: {
          greeting: 'Hello, I am Ivan',
          role: 'Developer',
          bio: 'My bio here',
          downloadCv: 'CV',
          stats: { experience: '5', projects: '90', clients: '105', awards: '15' }
        }
      })
    };

    // Mock IntersectionObserver
    (window as any).IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [
        { provide: LanguageService, useValue: languageServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the greeting from language service', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Hello, I am Ivan');
  });

  it('should display the download CV button', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('CV');
  });

  it('should have social links', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(4); // X, Instagram, LinkedIn, Facebook
  });
});
