import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll.service';
import { PLATFORM_ID } from '@angular/core';
import { vi } from 'vitest';

describe('ScrollService', () => {
  let service: ScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScrollService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(ScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect when scroll threshold is exceeded', () => {
    // Manually trigger a scroll event after setting window.scrollY
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    window.dispatchEvent(new Event('scroll'));
    expect(service.isThresholdExceeded()).toBe(true);
  });

  it('should detect when scroll threshold is NOT exceeded', () => {
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    window.dispatchEvent(new Event('scroll'));
    expect(service.isThresholdExceeded()).toBe(false);
  });

  it('should scroll to element', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'test-section';
    mockElement.scrollIntoView = vi.fn(); // Manually add the mock
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    service.scrollToSection('test-section');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
