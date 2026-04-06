import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Services } from './services';
import { LanguageService } from '../../services/language.service';
import { signal } from '@angular/core';

describe('Services', () => {
  let component: Services;
  let fixture: ComponentFixture<Services>;
  let languageServiceMock: any;

  beforeEach(async () => {
    languageServiceMock = {
      t: signal({
        services: { title: 'My Services' }
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
      imports: [Services],
      providers: [
        { provide: LanguageService, useValue: languageServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Services);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title from language service', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('My Services');
  });

  it('should render all service cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.group.bg-white');
    expect(cards.length).toBe(3); // Web, UI/UX, App
  });
});
