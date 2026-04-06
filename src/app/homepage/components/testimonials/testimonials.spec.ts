import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Testimonials } from './testimonials';

describe('Testimonials', () => {
  let component: Testimonials;
  let fixture: ComponentFixture<Testimonials>;

  beforeEach(async () => {
    // Mock IntersectionObserver
    (window as any).IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    await TestBed.configureTestingModule({
      imports: [Testimonials]
    }).compileComponents();

    fixture = TestBed.createComponent(Testimonials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render testimonial cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.bg-white');
    expect(cards.length).toBe(3);
  });

  it('should display testimonial name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('John Doe');
  });

  it('should render star ratings', () => {
    const stars = fixture.nativeElement.querySelectorAll('svg.w-5.h-5');
    // Each card has 5 stars, total 3 cards
    expect(stars.length).toBe(15);
  });
});
