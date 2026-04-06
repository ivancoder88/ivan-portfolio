import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with English language', () => {
    expect(service.currentLanguage()).toBe('en');
    expect(service.t().nav.home).toBe('Home');
  });

  it('should toggle language to Croatian', () => {
    service.toggleLanguage();
    expect(service.currentLanguage()).toBe('hr');
    expect(service.t().nav.home).toBe('Početna');
  });

  it('should set language specifically', () => {
    service.setLanguage('hr');
    expect(service.currentLanguage()).toBe('hr');
    service.setLanguage('en');
    expect(service.currentLanguage()).toBe('en');
  });
});
